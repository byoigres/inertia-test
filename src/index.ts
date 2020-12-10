import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { inertia } from "inertia-node";

import template from './template'

const app = express();
const port = 3000;
const ASSET_VERSION = "1";

app.use(cookieParser("my super secret code"));

app.use(express.static("public"));

app.use(express.json());

app.use(inertia(template, ASSET_VERSION));

function checkToken(req: Request, res: Response, next: NextFunction) {
  //get authcookie from request
  const data = req.cookies["tinterbal-ssid"];

  //verify token which is in cookie value
  if (data && data.id) {
    req.auth = {
      isAuthenticated: true,
      credentials: data,
    };
    return next();
  } else {
    res.redirect("/login");
  }
}

app.get("/", checkToken, function (req: Request, res: Response) {
  req.Inertia.setViewData({ title: "Inertia Page" }).render({
    component: "Dashboard/Index",
    props: { username: "ironman" },
  });
});

app.get("/login", function (req: Request, res: Response) {
  if (req.cookies["tinterbal-ssid"]) {
    res.redirect("/");
  }
  req.Inertia.setViewData({ title: "Login" }).render({
    component: "Auth/Session",
    props: { username: "ironman" },
  });
});

app.post("/logout", function (req: Request, res: Response) {
  res.clearCookie("tinterbal-ssid");
  res.redirect("back");
});

app.post("/login", function (req: Request, res: Response) {
  const minute = 60000 * 30;

  if (req.body.email && req.body.password) {
    res.cookie("tinterbal-ssid", { id: 1 }, { maxAge: minute });
    res.redirect("/");
  } else {
    res.send("wrong data");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
