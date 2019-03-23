import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Gauge from "./Gauge";
import "./App.css";

const RESULTS_QUERY = gql`
  query results {
    results {
      alex
      eve
    }
  }
`;

const RESULTS_SUBSCRIPTION = gql`
  subscription results {
    result {
      alex
      eve
    }
  }
`;

const byHowMuch = (leader, { alex, eve }) =>
  leader === "Alex" ? alex - eve : leader === "Eve" ? eve - alex : 0;

const totalVote = ({ alex, eve }) => alex + eve;

const convertToGaugeValue = (leader, by) =>
  leader === "Alex" ? by * 50 + 50 : 50 - by * 50;

const getGaugeValue = results =>
  convertToGaugeValue(
    getLeader(results),
    byHowMuch(getLeader(results), results) / totalVote(results)
  ) || 50;

const getLeader = ({ alex, eve }) =>
  alex - eve < 0 ? "Eve" : alex - eve > 0 ? "Alex" : " ";

export default function App() {
  return (
    <Query query={RESULTS_QUERY}>
      {({ client, data, loading, error, subscribeToMore }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <pre>ERROR!!! {JSON.stringify(error)}</pre>;

        subscribeToMore({
          document: RESULTS_SUBSCRIPTION,
          updateQuery: (
            prev,
            {
              subscriptionData: {
                data: { result }
              }
            }
          ) => {
            client.writeQuery({
              query: RESULTS_QUERY,
              data: {
                results: result
              }
            });
          }
        });

        const { alex, eve } = data.results;

        return (
          <Gauge
            value={getGaugeValue(data.results)}
            width={window.innerWidth - 0.25 * window.innerWidth}
            height={window.innerHeight - 0.15 * window.innerHeight}
            backgroundColor="#0000FF"
            label=" "
            fill={getLeader(data.results) === "Alex" ? "#FF0000" : "#0000FF"}
            leftValue={`Alex ${alex}`}
            rightValue={`Eve ${eve}`}
            centerValue={getLeader(data.results)}
          />
        );
      }}
    </Query>
  );
}
