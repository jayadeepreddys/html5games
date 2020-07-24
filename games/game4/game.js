"use strict";
//score update methods
$( document ).ready(function() {
    console.log( "ready!" );
    currentUser();
});
function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("You are logged in");
            checkBattle(battleId);
        } else {
            window.location.href = 'https://moneygames.app/signup.html';
        }
      });
}
function checkBattle(battleId){
    if(battleId){
    var docRef = db.collection("Battles").doc(battleId);

docRef.get().then(function(doc) {
    if (doc.exists) {
       var bData = doc.data();
       var updatescore = bData.Score;
       if(updatescore){
           alert("You have already finished playing this game");
           window.location.href = 'https://moneygames.app/battle.html?battleId='+battleId+'';
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    }
}

function fbScoreUpdater(){
    if(gameId && game.SCORE > lastscore ){
        db.collection("TournamentUser").doc(gameId).update({
            Score: this.blocks.length-1,
            timeStamp: timeStamp
        })
        .then(function() {
            console.log("Game score updated");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    else {
        console.log("Game score is not highest");
    }   
    if(battleId){
        db.collection("Battles").doc(battleId).update({
            Score: this.blocks.length-1,
            timeStamp: timeStamp
        })
        .then(function() {
            window.location.href = 'https://moneygames.app/battle.html?battleId='+battleId+'';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}



 // Make the body go full screen.
function goFullScreen(){
    var elem = document.body;   
requestFullScreen(elem);
}
let searchParams = new URLSearchParams(window.location.search);
//let userId = searchParams.get('userId');
//console.log(userId);
let gameId = searchParams.get('gameId');
let battleId = searchParams.get('battleId');
let timeStamp = new Date();
//let scoreId = mobile.concat(tournamentId);
var lastscore = 0;
//console.log(scoreId);
// check last score
getlastscore();
function getlastscore(){
if(gameId){
    var docRef = db.collection("TournamentUser").doc(gameId);
    docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        lastscore = doc.data().Score;
        console.log(lastscore);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}
}

var __extends =
        (this && this.__extends) ||
        (function () {
            var e = function (t, o) {
                return (e =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                            e.__proto__ = t;
                        }) ||
                    function (e, t) {
                        for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
                    })(t, o);
            };
            return function (t, o) {
                function a() {
                    this.constructor = t;
                }
                e(t, o), (t.prototype = null === o ? Object.create(o) : ((a.prototype = o.prototype), new a()));
            };
        })(),
    ball_game = (function (e) {
        function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.velocity_down = 0), (t.gravity = 0), (t.is_lose = !1), (t.score_to_add = 0), t;
        }
        return __extends(t, e), (t.prototype.update = function () {}), t;
    })(BABYLON.AbstractMesh);
function set_ball_game(e) {
    (e.score_to_add = 0),
        (e.is_lose = !1),
        (e.velocity_down = velocity_jump),
        (e.gravity = gravity_ball),
        (e.ball_collider = game.scene.getMeshByName("ball_collider")),
        (e.update = function () {
            e.is_lose ||
                ((game.root_ball.position.y = game.root_ball.position.y + e.velocity_down * game.DELTA + 0.5 * e.gravity * game.DELTA * game.DELTA),
                (e.velocity_down = e.velocity_down + e.gravity * game.DELTA),
                e.velocity_down < max_fall_velocity && (e.velocity_down = max_fall_velocity),
                (e.rotation.z -= 0.1));
            for (
                var t = !1,
                    o = !1,
                    a = -1e3,
                    n = 0,
                    i = !1,
                    r = function (r) {
                        game.platforms[r].colliders.forEach(function (l) {
                            e.ball_collider.intersectsMesh(l, !0, !1) &&
                                !game.platforms[r].was_hit &&
                                (1 != game.platforms[r].type || game.platforms[r].is_animated
                                    ? 2 == game.platforms[r].type
                                        ? ((a = r), (o = !0))
                                        : 3 == game.platforms[r].type && ((i = !0), (n = game.platforms[r].position.y))
                                    : ((t = !0), (n = game.platforms[r].position.y)));
                        });
                    },
                    l = 0;
                l < game.platforms.length;
                l++
            )
                r(l);
            t ||
                !o ||
                i ||
                (game.ball.score_to_add++,
                (game.score_to_add.position = game.ball.getAbsolutePosition().clone()),
                (game.gui.score_to_add.alpha = 1),
                (game.platforms[a].was_hit = !0),
                (game.SCORE += e.score_to_add),
                (game.gui.score_text.text = game.SCORE.toString()),
                (game.gui.score_to_add.text = "+" + e.score_to_add.toString()),
                game.platform_generator.animate_pass(game.platforms[a]),
                game.platform_generator.generate(),
                on_pass_helix(game.SCORE)),
                t && ((e.score_to_add = 0), (game.root_ball.position.y = n + 0.4), (e.velocity_down = velocity_jump)),
                i && ((e.is_lose = !0), (e.scaling.y = 0.5), (e.rotation.z = 0), (game.root_ball.position.y = n + 0.1), game.lose(), on_game_over());
        });
}
var game,
    Game = (function () {
        function e(e) {
            (this.SCORE = 0),
                (this.RECORD = 0),
                (this.PLAY = !1),
                (this.DELTA = 0),
                (this.local_storage = new local_storage()),
                (this.platform_generator = new platform_generator()),
                (this.platforms = new Array()),
                (this.materials = new Array()),
                (this.gui = new gui()),
                (this.canvas = document.getElementById(e)),
                (this.engine = new BABYLON.Engine(this.canvas, !0)),
                (this.engine.loadingScreen.displayLoadingUI = function () {});
        }
        return (
            (e.prototype.createScene = function () {
                BABYLON.SceneLoader.Load("", "models/aver.babylon", this.engine, load_objects);
            }),
            (e.prototype.play = function () {
                (this.PLAY = !0), this.gui.add_playable_input_zone(), (this.SCORE = 0);
            }),
            (e.prototype.replay = function () {
                game.platforms.forEach(function (e) {
                    e.position.y = 1e3;
                }),
                    (this.score_to_add.position.y = 1e3),
                    (this.root_game.position.y = 0),
                    (this.root_game.rotation = BABYLON.Vector3.Zero()),
                    (this.root_ball.position.y = 0),
                    (this.root_ball.rotation = BABYLON.Vector3.Zero()),
                    (this.pipe.position.y = 0),
                    (this.spawmer.position.y = 0),
                    this.gui.add_playable_input_zone(),
                    (this.SCORE = 0),
                    game.platform_generator.generate_firts(),
                    game.platform_generator.generate(),
                    game.platform_generator.generate(),
                    (game.ball.scaling.y = 1),
                    (game.ball.is_lose = !1),
                    game.gui.add_playable_input_zone(),
                    setTimeout(function () {
                        game.PLAY = !0;
                    }, 100);
            }),
            (e.prototype.lose = function () {
                var e = this;
                (game.PLAY = !1),
                    this.platforms.forEach(function (t) {
                        (t.rotation_vel = 0), (e.gui.score_text.text = e.SCORE.toString());
                    }),
                    this.SCORE > this.RECORD && (this.RECORD = this.SCORE),
                    game.local_storage.write(),
                    this.gui.add_lose_menu();
                   
            }),
            e
        );
    })();
function on_press_start() {}
function on_press_restart() {}
function on_game_over() {fbScoreUpdater();}
function on_page_load() {}
function on_save_load(e) {}
function on_assets_load() {}
function on_pass_helix(e) {}
window.addEventListener("DOMContentLoaded", function () {
    on_page_load(),
        (game = new Game("renderCanvas")).local_storage.read(),
        game.createScene(),
        window.addEventListener("resize", function () {
            game.engine.resize();
        });
});
var gui = (function () {
    function e() {
        (this.can_move = !1), (this.displace = 0), (this.last_x = -10);
    }
    return (
        (e.prototype.add_playable_input_zone = function () {
            game.gui.current_gui.dispose();
            var e = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            (this.current_gui = e), (e.idealHeight = 1024);
            var t = new BABYLON.GUI.TextBlock();
            (this.score_to_add = t), (t.text = "+1"), (t.color = "white"), e.addControl(t), t.linkWithMesh(game.score_to_add), (t.linkOffsetY = 0);
            var o = new BABYLON.GUI.TextBlock();
            (this.score_text = o),
                (o.text = "0"),
                (o.color = "white"),
                (o.fontSize = 128),
                (o.paddingTop = 111),
                (o.outlineWidth = 5),
                (o.outlineColor = "black"),
                (o.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP),
                e.addControl(o);
            var a = BABYLON.GUI.Button.CreateSimpleButton("but", "");
            (a.width = 1),
                (a.height = 1),
                (a.color = "transparent"),
                (a.background = "transparent"),
                a.onPointerDownObservable.add(function (e) {
                    (game.gui.last_x = e.x), (game.gui.can_move = !0);
                }),
                (a.pointerDownAnimation = function () {}),
                a.onPointerUpObservable.add(function () {
                    game.gui.can_move = !1;
                }),
                a.onPointerMoveObservable.add(function (e) {
                    if (game.gui.can_move) {
                        a.getLocalCoordinates(e);
                        (game.gui.displace = e.x - game.gui.last_x), (game.gui.last_x = e.x);
                    }
                }),
                e.addControl(a);
        }),
        (e.prototype.add_main_menu = function () {
            var e = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            (game.gui.current_gui = e), (e.idealHeight = 1024);
            var t = new BABYLON.GUI.Image("images", "images/title.svg");
            (t.height = 1), (t.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM), e.addControl(t);
            var o = BABYLON.GUI.Button.CreateSimpleButton("but", "PLAY");
            (o.thickness = 0),
                (o.color = "white"),
                (o.fontSize = 60),
                (o.height = 0.2),
                (o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM),
                o.onPointerDownObservable.add(function () {
                    "white" == o.color &&
                        ((o.color = "rgba(255,255,255,0.5)"),
                        on_press_start(),
                        setTimeout(function () {
                            game.play();
                        }, 300));
                }),
                e.addControl(o);
        }),
        (e.prototype.add_lose_menu = function () {
            game.gui.current_gui.dispose();
            var e = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            (game.gui.current_gui = e), (e.idealHeight = 1024);
            var t = new BABYLON.GUI.TextBlock();
            (this.score_text = t),
                (t.text = game.SCORE.toString()),
                (t.color = "white"),
                (t.fontSize = 128),
                (t.paddingTop = 111),
                (t.outlineWidth = 5),
                (t.outlineColor = "black"),
                (t.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP),
                e.addControl(t);
            var o = new BABYLON.GUI.TextBlock();
            (this.record_text = t),
                (o.text = "High Score " + game.RECORD.toString()),
                (o.color = "white"),
                (o.fontSize = 50),
                (o.paddingTop = 45),
                (o.outlineWidth = 2.5),
                (o.outlineColor = "black"),
                (o.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP),
                e.addControl(o);
            var a = BABYLON.GUI.Button.CreateSimpleButton("but", "REPLAY");
            (a.thickness = 0),
                (a.color = "white"),
                (a.fontSize = 60),
                (a.height = 0.2),
                (a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM),
                a.onPointerDownObservable.add(function () {
                    "white" == a.color &&
                        (on_press_restart(),
                        (a.color = "rgba(255,255,255,0.5)"),
                        setTimeout(function () {
                            game.gui.current_gui.dispose(), game.replay();
                        }, 300));
                }),
                e.addControl(a);
        }),
        e
    );
})();
function load_objects(e) {
    (game.scene = e),
        (game.materials[1] = e.getMaterialByName("aver.mat1")),
        (game.materials[2] = e.getMaterialByName("aver.mat2")),
        (game.materials[3] = e.getMaterialByName("aver.mat3")),
        (game.spawmer = e.getMeshByName("spawmer")),
        (game.score_to_add = e.getMeshByName("score_to_add")),
        (game.platform_template = e.getMeshByName("platform")),
        (game.platform_template.position.x = 99999);
    for (var t = 0; t < 30; t++) (game.platforms[t] = game.platform_template.clone("platform" + t, null, !1)), (game.platforms[t].position.y = 1e3), (game.platforms[t].rotationQuaternion = null), set_platform(game.platforms[t], 1);
    (game.pipe = e.getMeshByName("pipe")),
        (game.ball = e.getMeshByName("ball")),
        set_ball_game(game.ball),
        (game.root_game = e.getMeshByName("root_game")),
        (game.root_ball = e.getMeshByName("root_ball")),
        game.platform_generator.generate_firts(),
        game.platform_generator.generate(),
        game.platform_generator.generate(),
        game.engine.runRenderLoop(main_logic_loop),
        game.gui.add_main_menu(),
        on_assets_load();
}
var local_storage = (function () {
    function e() {}
    return (
        (e.prototype.read = function () {
            "undefined" != typeof Storage && (null == localStorage.getItem(name_for_localstorage) || (game.RECORD = Number(localStorage.getItem(name_for_localstorage))));
        }),
        (e.prototype.write = function () {
            "undefined" != typeof Storage && (localStorage.setItem(name_for_localstorage, game.RECORD.toString()), on_save_load(game.RECORD));
        }),
        e
    );
})();
function main_logic_loop() {
    var e = game.ball.getAbsolutePosition();
    (game.DELTA = game.engine.getDeltaTime()),
        game.DELTA > 50 && (game.DELTA = 50),
        game.PLAY &&
            (game.ball.is_lose || ((game.root_game.rotation.y += game.gui.displace / 30), (game.root_ball.rotation.y = game.root_game.rotation.y), (game.gui.displace = 0), game.ball.update()),
            game.pipe.position.y > game.root_ball.position.y && (game.pipe.position.y -= 1.644),
            game.platforms.forEach(function (e) {
                e.update();
            }),
            game.root_game.position.y > e.y && (game.root_game.position.y = e.y),
            (game.gui.score_to_add.alpha -= 0.01),
            game.gui.score_to_add.alpha < 0 && (game.gui.score_to_add.alpha = 0)),
        game.scene.render();
}
var platform = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.type = 0), (t.was_hit = !1), (t.rotation_vel = rotation_velocity_platforms), (t.is_animated = !1), t;
    }
    return __extends(t, e), (t.prototype.update = function () {}), t;
})(BABYLON.AbstractMesh);
function set_platform(e, t) {
    (e.update = function () {
        (e.rotation.y += e.rotation_vel * game.DELTA), e.is_animated && ((e.scaling.x -= 0.1), (e.scaling.z -= 0.1), e.scaling.x < 0 && (e.scaling = BABYLON.Vector3.Zero()));
    }),
        (e.colliders = new Array()),
        (e.colliders[0] = e.getChildMeshes()[0]),
        (e.colliders[1] = e.getChildMeshes()[1]),
        (e.is_animated = !1),
        (e.rotation_vel = 0),
        (e.type = t),
        (e.was_hit = !1);
}
var platform_generator = (function () {
        function e() {}
        return (
            (e.prototype.generate = function () {
                (game.spawmer.position.y += -distance_for_move_spawmer), game.SCORE < 5 ? this.generate_one() : game.SCORE < 13 ? this.generate_two() : this.generate_three();
            }),
            (e.prototype.generate_firts = function () {
                for (
                    var e = [
                            [1, 2, 1, 1, 1, 1],
                            [1, 1, 1, 2, 1, 1],
                        ][Math.floor(2 * Math.random())],
                        t = 0;
                    t < 6;
                    t++
                ) {
                    var o = this.choose_platform();
                    (o.position = game.spawmer.position.clone()),
                        (o.material = game.materials[e[t]]),
                        (o.was_hit = !1),
                        (o.rotation.y = 0),
                        (o.rotation.y += (Math.PI / 3) * t - 0.55),
                        (o.type = e[t]),
                        (o.is_animated = !1),
                        (o.scaling = BABYLON.Vector3.One());
                }
            }),
            (e.prototype.generate_one = function () {
                for (var e = this.shuffle([1, 1, 1, 1, 1, 2]), t = 0; t < 6; t++) {
                    var o = this.choose_platform();
                    (o.position = game.spawmer.position.clone()),
                        (o.material = game.materials[e[t]]),
                        (o.was_hit = !1),
                        (o.rotation.y = 0),
                        (o.rotation.y += (Math.PI / 3) * t - 0.55),
                        (o.type = e[t]),
                        (o.is_animated = !1),
                        (o.scaling = BABYLON.Vector3.One());
                }
            }),
            (e.prototype.generate_two = function () {
                for (var e = this.shuffle([1, 1, 1, 1, 2, 3]), t = 0; t < 6; t++) {
                    var o = this.choose_platform();
                    (o.position = game.spawmer.position.clone()),
                        (o.material = game.materials[e[t]]),
                        (o.was_hit = !1),
                        (o.rotation.y = 0),
                        (o.rotation.y += (Math.PI / 3) * t - 0.55),
                        (o.type = e[t]),
                        (o.is_animated = !1),
                        (o.scaling = BABYLON.Vector3.One());
                }
            }),
            (e.prototype.generate_three = function () {
                for (var e = this.shuffle([1, 1, 1, 2, 3, 3]), t = 2 * Math.round(Math.random()) - 1, o = 0; o < 6; o++) {
                    var a = this.choose_platform();
                    (a.position = game.spawmer.position.clone()),
                        (a.material = game.materials[e[o]]),
                        (a.was_hit = !1),
                        (a.rotation.y = 0),
                        (a.rotation.y += (Math.PI / 3) * o - 0.55),
                        (a.type = e[o]),
                        (a.is_animated = !1),
                        (a.scaling = BABYLON.Vector3.One()),
                        (a.rotation_vel = rotation_velocity_platforms * t);
                }
            }),
            (e.prototype.animate_pass = function (e) {
                game.platforms.forEach(function (t) {
                    t.position.y == e.position.y && (t.is_animated = !0);
                });
            }),
            (e.prototype.choose_platform = function () {
                var e = null;
                return (
                    game.platforms.forEach(function (t) {
                        t.position.y > game.root_ball.position.y + 4 && (e = t);
                    }),
                    e
                );
            }),
            (e.prototype.shuffle = function (e) {
                for (var t, o, a = e.length; a; ) (o = Math.floor(Math.random() * a--)), (t = e[a]), (e[a] = e[o]), (e[o] = t);
                return e;
            }),
            e
        );
    })(),
    distance_for_move_spawmer = 3.5,
    gravity_ball = -16e-6,
    velocity_jump = 0.009,
    max_fall_velocity = -0.009,
    rotation_velocity_platforms = 0.0015,
    name_for_localstorage = "sixhelixhtml5gamebabylonjsbestscore1";
