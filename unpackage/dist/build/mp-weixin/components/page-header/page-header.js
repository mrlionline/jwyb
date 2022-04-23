(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-header/page-header"],{"0472":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={name:"page-header",props:{title:{type:String},showBack:{type:Boolean,default:!0}},data:function(){return{}},created:function(){},computed:{backArrowSize:function(){return this.showBack?"20px":0}},methods:{back:function(){console.log("111"),n.navigateBack()}}};e.default=t}).call(this,t("543d")["default"])},"2c7f":function(n,e,t){"use strict";t.r(e);var a=t("0472"),u=t.n(a);for(var c in a)"default"!==c&&function(n){t.d(e,n,(function(){return a[n]}))}(c);e["default"]=u.a},"31f1":function(n,e,t){"use strict";t.r(e);var a=t("c4ea"),u=t("2c7f");for(var c in u)"default"!==c&&function(n){t.d(e,n,(function(){return u[n]}))}(c);t("4800");var r,o=t("f0c5"),i=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=i.exports},4800:function(n,e,t){"use strict";var a=t("d9eb"),u=t.n(a);u.a},c4ea:function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"c",(function(){return c})),t.d(e,"a",(function(){return a}));var a={uNavbar:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(t.bind(null,"3cb4"))}},u=function(){var n=this,e=n.$createElement;n._self._c},c=[]},d9eb:function(n,e,t){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-header/page-header-create-component',
    {
        'components/page-header/page-header-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("31f1"))
        })
    },
    [['components/page-header/page-header-create-component']]
]);
