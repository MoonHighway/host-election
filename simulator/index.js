const { request } = require("graphql-request");
let [, , url, favor = ""] = process.argv;

url = url || "http://localhost:4000/graphql";
favor = favor.toLowerCase();

const query = `
  mutation vote($host: Host!) {
      vote(host:$host)
  }
`;

const randomDelay = () => Math.floor(Math.random() * 3000);

const randomVote = () => {
  const host = Math.random() > 0.5 ? "ALEX" : "EVE";
  request(url, query, { host });
  console.log("voted for ", host);
  setTimeout(randomVote, randomDelay());
};

setTimeout(randomVote, randomDelay());
setTimeout(randomVote, randomDelay());
setTimeout(randomVote, randomDelay());
setTimeout(randomVote, randomDelay());

console.log("press any key to exit");
process.stdin.on("data", () => process.exit());
