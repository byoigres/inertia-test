"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cookie_parser_1 = require("cookie-parser");
var inertia_node_1 = require("inertia-node");
var template_1 = require("./template");
var app = express_1["default"]();
var port = 3000;
var ASSET_VERSION = "1";
app.use(cookie_parser_1["default"]("my super secret code"));
app.use(express_1["default"].static("public"));
app.use(express_1["default"].json());
app.use(inertia_node_1.inertia(template_1["default"], ASSET_VERSION));
function checkToken(req, res, next) {
    //get authcookie from request
    var data = req.cookies["tinterbal-ssid"];
    //verify token which is in cookie value
    if (data && data.id) {
        req.auth = {
            isAuthenticated: true,
            credentials: data
        };
        return next();
    }
    else {
        res.redirect("/login");
    }
}
app.get("/", checkToken, function (req, res) {
    req.Inertia.setViewData({ title: "Inertia Page" }).render({
        component: "Dashboard/Index",
        props: { username: "ironman" }
    });
});
app.get("/login", function (req, res) {
    if (req.cookies["tinterbal-ssid"]) {
        res.redirect("/");
    }
    req.Inertia.setViewData({ title: "Login" }).render({
        component: "Auth/Session",
        props: { username: "ironman" }
    });
});
app.post("/logout", function (req, res) {
    res.clearCookie("tinterbal-ssid");
    res.redirect("back");
});
app.post("/login", function (req, res) {
    var minute = 60000 * 30;
    if (req.body.email && req.body.password) {
        res.cookie("tinterbal-ssid", { id: 1 }, { maxAge: minute });
        res.redirect("/");
    }
    else {
        res.send("wrong data");
    }
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
