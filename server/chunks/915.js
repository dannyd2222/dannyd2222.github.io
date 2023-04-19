"use strict";
exports.id = 915;
exports.ids = [915];
exports.modules = {

/***/ 777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Appbar_ApplicationBar)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "@mui/material/AppBar"
var AppBar_ = __webpack_require__(3882);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar_);
// EXTERNAL MODULE: external "@mui/material/Toolbar"
var Toolbar_ = __webpack_require__(1431);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar_);
// EXTERNAL MODULE: external "@mui/material/IconButton"
var IconButton_ = __webpack_require__(7934);
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_);
// EXTERNAL MODULE: external "@mui/icons-material/Menu"
var Menu_ = __webpack_require__(3365);
var Menu_default = /*#__PURE__*/__webpack_require__.n(Menu_);
// EXTERNAL MODULE: external "@mui/icons-material/ArrowBack"
var ArrowBack_ = __webpack_require__(3622);
var ArrowBack_default = /*#__PURE__*/__webpack_require__.n(ArrowBack_);
// EXTERNAL MODULE: external "@mui/styles/makeStyles"
var makeStyles_ = __webpack_require__(8409);
var makeStyles_default = /*#__PURE__*/__webpack_require__.n(makeStyles_);
// EXTERNAL MODULE: external "@mui/material/Drawer"
var Drawer_ = __webpack_require__(7898);
var Drawer_default = /*#__PURE__*/__webpack_require__.n(Drawer_);
// EXTERNAL MODULE: external "@mui/material/List"
var List_ = __webpack_require__(4192);
var List_default = /*#__PURE__*/__webpack_require__.n(List_);
// EXTERNAL MODULE: external "@mui/material/ListSubheader"
var ListSubheader_ = __webpack_require__(9685);
var ListSubheader_default = /*#__PURE__*/__webpack_require__.n(ListSubheader_);
// EXTERNAL MODULE: external "@mui/material/ListItem"
var ListItem_ = __webpack_require__(834);
var ListItem_default = /*#__PURE__*/__webpack_require__.n(ListItem_);
// EXTERNAL MODULE: external "@mui/material/ListItemText"
var ListItemText_ = __webpack_require__(8315);
var ListItemText_default = /*#__PURE__*/__webpack_require__.n(ListItemText_);
// EXTERNAL MODULE: external "@mui/material/Link"
var Link_ = __webpack_require__(5246);
var Link_default = /*#__PURE__*/__webpack_require__.n(Link_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "@mui/material/ListItemIcon"
var ListItemIcon_ = __webpack_require__(3787);
var ListItemIcon_default = /*#__PURE__*/__webpack_require__.n(ListItemIcon_);
// EXTERNAL MODULE: external "@mui/icons-material/Login"
var Login_ = __webpack_require__(7752);
var Login_default = /*#__PURE__*/__webpack_require__.n(Login_);
// EXTERNAL MODULE: ./src/data.json
var data = __webpack_require__(468);
;// CONCATENATED MODULE: ./src/components/SidebarMenu.tsx




// import Divider from '@mui/material/Divider';








const useStyles = makeStyles_default()((theme)=>({
        list: {
            minWidth: 250
        }
    }));
const menus = {
    readBooks: "readBooks"
};
function ApplicationBar({ onClose =()=>{}  }) {
    const classes = useStyles();
    const readBooks = data/* recommendedBooks */.pd;
    const [opened, setOpened] = (0,external_react_.useState)({});
    const isMenuOpened = (menu)=>Boolean(opened[menu]);
    const toggleMenu = (menu)=>setOpened({
            ...opened,
            [menu]: !opened[menu]
        });
    const readBooksOpened = isMenuOpened(menus.readBooks);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: classes.list,
        children: /*#__PURE__*/ jsx_runtime_.jsx((List_default()), {
            subheader: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((ListSubheader_default()), {
                component: "div",
                id: "nested-list-subheader",
                children: [
                    "@",
                    data/* companyName */.ub
                ]
            }),
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((ListItem_default()), {
                button: true,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                        children: /*#__PURE__*/ jsx_runtime_.jsx((Login_default()), {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((Link_default()), {
                        href: "/login",
                        color: "inherit",
                        component: (link_default()),
                        children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemText_default()), {
                            primary: "Login"
                        })
                    })
                ]
            })
        })
    });
}

;// CONCATENATED MODULE: ./src/components/Sidebar.tsx





// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
const Sidebar_useStyles = makeStyles_default()((theme)=>({}));
function Sidebar_ApplicationBar({ isOpen =false , onClose =()=>{}  }) {
    const classes = Sidebar_useStyles();
    return /*#__PURE__*/ jsx_runtime_.jsx((Drawer_default()), {
        anchor: "left",
        open: isOpen,
        onClose: onClose,
        children: /*#__PURE__*/ jsx_runtime_.jsx(ApplicationBar, {
            onClose: onClose
        })
    });
}

// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/icons-material/Brightness4"
var Brightness4_ = __webpack_require__(7280);
var Brightness4_default = /*#__PURE__*/__webpack_require__.n(Brightness4_);
// EXTERNAL MODULE: external "@mui/icons-material/Brightness7"
var Brightness7_ = __webpack_require__(6233);
var Brightness7_default = /*#__PURE__*/__webpack_require__.n(Brightness7_);
// EXTERNAL MODULE: ./src/contexts/MUIWrapper.tsx + 1 modules
var MUIWrapper = __webpack_require__(62);
;// CONCATENATED MODULE: ./src/components/ThemeSwitcher.tsx







function ThemeSwitcher() {
    const theme = (0,material_.useTheme)();
    const muiUtils = external_react_default().useContext(MUIWrapper/* MUIWrapperContext */.$);
    return /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
        sx: {
            ml: 1
        },
        onClick: muiUtils.toggleColorMode,
        color: "inherit",
        children: theme.palette.mode === "dark" ? /*#__PURE__*/ jsx_runtime_.jsx((Brightness7_default()), {}) : /*#__PURE__*/ jsx_runtime_.jsx((Brightness4_default()), {})
    });
}

;// CONCATENATED MODULE: ./src/components/Appbar.tsx










function Appbar_ApplicationBar({ parent =null  }) {
    const router = (0,router_.useRouter)();
    const [isSidebarOpen, setIsSidebarOpen] = (0,external_react_.useState)(false);
    const onIconClick = ()=>{
        if (parent) {
            router.push(parent);
            return;
        }
        onSidebarOpen();
    };
    const onSidebarClose = ()=>setIsSidebarOpen(false);
    const onSidebarOpen = ()=>setIsSidebarOpen(true);
    const Icon = parent ? (ArrowBack_default()) : (Menu_default());
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((AppBar_default()), {
        position: "static",
        color: "transparent",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Toolbar_default()), {
                style: {
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        onClick: onIconClick,
                        size: "large",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Icon, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(ThemeSwitcher, {})
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Sidebar_ApplicationBar, {
                isOpen: isSidebarOpen,
                onClose: onSidebarClose
            })
        ]
    });
}


/***/ }),

/***/ 1533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Copyright)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5246);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(468);





function Copyright() {
    const websiteName = _data_json__WEBPACK_IMPORTED_MODULE_4__/* .companyName */ .ub;
    const websiteUrl = _data_json__WEBPACK_IMPORTED_MODULE_4__/* .webSite */ .QI;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default()), {
        variant: "body2",
        color: "textSecondary",
        align: "center",
        children: [
            "Copyright \xa9 ",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Link__WEBPACK_IMPORTED_MODULE_3___default()), {
                color: "inherit",
                href: websiteUrl,
                children: websiteName
            }),
            " ",
            new Date().getFullYear(),
            "."
        ]
    });
}


/***/ })

};
;