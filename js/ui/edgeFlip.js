// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-
const Main = imports.ui.main;
const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Mainloop = imports.mainloop;
const Lang = imports.lang;
const Cinnamon = imports.gi.Cinnamon;

function EdgeFlipper(side, func){
    this._init(side, func);
}

EdgeFlipper.prototype = {
    _init: function(side, func){
        this.side = side;
        this.func = func;

        this.enabled = true;
        this.entered = false;
        this.activated = false;

        this._checkOver();
    },

    _checkOver: function(){
        let mask;
        [this.xMouse, this.yMouse, mask] = global.get_pointer();
        if (this.side == St.Side.RIGHT){
            if (this.xMouse + 5 > global.screen_width){
                this._onMouseEnter();
            } else {
                this._onMouseLeave();
            }
        } else if (this.side == St.Side.LEFT){
            if (this.xMouse < 5 ){
                this._onMouseEnter();
            } else {
                this._onMouseLeave();
            }
        } else if (this.side == St.Side.BOTTOM){
            if (this.yMouse + 5 > global.screen_height) {
                this._onMouseEnter();
            } else {
                this._onMouseLeave();
            }
        } else if (this.side == St.Side.TOP){
            if (this.yMouse < 5){
                this._onMouseEnter();
            } else {
                this._onMouseLeave();
            }
        }
        Mainloop.timeout_add(500, Lang.bind(this, this._checkOver));
    },

    _onMouseEnter: function(){
        this.entered = true;
        Mainloop.timeout_add(1000, Lang.bind(this, this._check));
    },

    _check: function(){
        if (this.entered && this.enabled && !this.activated){
            this.func();
            this.activated = true;
        }
    },

    _onMouseLeave: function(){
        this.entered = false;
        this.activated = false;
    }
};
