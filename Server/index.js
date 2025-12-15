import cors from "cors";
import express from "express";
import {v4 as uuid} from "uuid";

const app=express();
const port= process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors({
  origin: "https://pravirat.github.io",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.get("/", (req,res)=> {
    res.status(200).json(adj);
});

app.get("/data/:id", (req,res)=> {
    const pathParams= req.params.id;
    const requiredInfo= adj.filter((item)=> item.id==pathParams);
    if (requiredInfo.length) {
        res.status(200).json(requiredInfo);
    }else {
        res.status(404).send(`No Data Found for given ID:${pathParams} `);
    }
});

app.post("/data", (req,res)=> {
    const body= {
        id: uuid(),
        title: req.body.title?.trim(),
        content: req.body.content?.trim(),
        author: req.body.author?.trim(),
        date: new Date().toISOString()
    }

    adj.push(body);
    res.status(201).json(adj);
});

app.patch("/data/:id", (req,res)=> {
    const pathParams= req.params.id;
    const title= req.body.title?.trim();
    const content= req.body.content?.trim();
    const author= req.body.author?.trim();
    const requiredInfo= adj.find((item)=> item.id==pathParams);

    if (requiredInfo) {
        requiredInfo.title= title || requiredInfo.title;
        requiredInfo.content= content || requiredInfo.content;
        requiredInfo.author= author || requiredInfo.author;

        res.status(200).json(requiredInfo);
    } else {
        res.status(404).send(`No Data Found for given ID:${pathParams}`);
    }
});

app.delete("/data/:id", (req,res)=> {
  const pathParams= req.params.id;
  const requiredInfo= adj.find((item,index)=> index==pathParams);
  if (requiredInfo) {
    adj.splice(adj.indexOf(requiredInfo),1);
    res.status(200).json(adj);
  } else {
    res.status(404).send(`No Data Found for given ID:${pathParams}`);
  }
});

app.delete("/all", (req,res)=> {
  adj=[];
  res.status(200).json(adj);
});

app.listen(port, ()=> {
    console.log(`Listening on Port:${port}`);
});

let adj = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 4,
    title: "The Future of Remote Work",
    content:
      "Remote work has transitioned from being a temporary solution during global crises to a permanent fixture in many industries. Companies are rethinking office spaces, investing in digital collaboration tools, and prioritizing employee flexibility. This post explores the benefits, challenges, and long-term implications of remote work for both employers and employees.",
    author: "Sophia Martinez",
    date: "2023-08-15T11:45:00Z",
  },
  {
    id: 5,
    title: "Exploring the Potential of Quantum Computing",
    content:
      "Quantum computing represents a paradigm shift in processing power, leveraging the principles of quantum mechanics to solve problems that are currently intractable for classical computers. From drug discovery to financial modeling, quantum computers hold immense promise. This post delves into the basics of quantum computing, its potential applications, and the hurdles that remain before widespread adoption.",
    author: "Daniel Lee",
    date: "2023-08-20T16:20:00Z",
  },
];
