"use strict";
exports.id = 662;
exports.ids = [662];
exports.modules = {

/***/ 62:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "$": () => (/* binding */ MUIWrapperContext),
  "Z": () => (/* binding */ MUIWrapper)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
// EXTERNAL MODULE: external "@mui/material/colors"
var colors_ = __webpack_require__(5574);
;// CONCATENATED MODULE: ./src/theme/index.ts


const blackTheme = (0,styles_.createTheme)({
    palette: {
        mode: "dark",
        background: {
            default: colors_.grey[900]
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    typography: {
        fontSize: 13
    }
});
const lightTheme = (0,styles_.createTheme)({
    palette: {
        mode: "light",
        background: {
            default: colors_.grey[200]
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    typography: {
        fontSize: 13
    }
});
/* harmony default export */ const theme = (null);

;// CONCATENATED MODULE: ./src/contexts/MUIWrapper.tsx




/**
  TypeScript and React inconvenience:
  These functions are in here purely for types!
  They will be overwritten - it's just that
  createContext must have an initial value.
  Providing a type that could be 'null | something'
  and initiating it with *null* would be uncomfortable :)
*/ const MUIWrapperContext = /*#__PURE__*/ (0,external_react_.createContext)({
    toggleColorMode: ()=>{}
});
function MUIWrapper({ children  }) {
    const [mode, setMode] = (0,external_react_.useState)("light");
    const muiWrapperUtils = (0,external_react_.useMemo)(()=>({
            toggleColorMode: ()=>{
                setMode((prevMode)=>prevMode === "light" ? "dark" : "light");
            }
        }), []);
    const theme = (0,external_react_.useMemo)(()=>mode === "light" ? lightTheme : blackTheme, [
        mode
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(MUIWrapperContext.Provider, {
        value: muiWrapperUtils,
        children: /*#__PURE__*/ jsx_runtime_.jsx(material_.ThemeProvider, {
            theme: theme,
            children: children
        })
    });
}


/***/ }),

/***/ 468:
/***/ ((module) => {

module.exports = JSON.parse('{"v2":"Daniele Dalle Nogare","sQ":"https://lh3.googleusercontent.com/pw/AJFCJaUaieeGvY103kbb35bkz-EP9BCXnqCwrq7ZEsF5-y7_8CPiyQyewNm_CMKWoGO_7iEYPn9uCavxhsSHKfyU_QBKp_rg-Sxo2_toSd9f1W4uLGH7jT1_ZvIVP1YbIxBNNraSIUdLdvqgVBeP8Jy5rTmdrw","rH":"Full Stack Developer & Solutions Architect","QI":"https://dannyd2222.github.io/","ub":"danieledallenogare","aL":["Javascript","Typescript","React","NodeJS","Python","MySQL","MongoDB","Redux","Git","Problem solving","Algorithms","TDD","DDD"],"b8":[{"title":"Full Stack Developer & Solutions Architect","place":"Weborama","placeUrl":"https://weborama.com/it/su-di-noi/","image":"https://lh3.googleusercontent.com/pw/AJFCJaVA2n3sIsQ_QlkFLbqRnOzLAdu0LhkhhyL_SiSWY7u9gTpfst7Lh81WVKmVda_0lemcUjDMr---6YD2OYQIKhhcbGpCEtdMc9kr3MvJBWVcmKO45xYUCy9V4mjpmkV7gZV3oEkhIn1pLwV146F8nK_KBw","timePeriod":"03/2022 - actually","contentParagraphs":["Lavoro a stretto contatto con i project manager per acquisire una perfetta consapevolezza delle aspettative e dei limiti dei clienti prima di avviare un progetto di sviluppo. Analizzo e valuto periodicamente nuove tecnologie per migliorare l\'infrastruttura esistente."]},{"title":"Data Visualization Specialist","place":"Weborama","placeUrl":"https://weborama.com/it/su-di-noi/","image":"https://lh3.googleusercontent.com/pw/AJFCJaVA2n3sIsQ_QlkFLbqRnOzLAdu0LhkhhyL_SiSWY7u9gTpfst7Lh81WVKmVda_0lemcUjDMr---6YD2OYQIKhhcbGpCEtdMc9kr3MvJBWVcmKO45xYUCy9V4mjpmkV7gZV3oEkhIn1pLwV146F8nK_KBw","timePeriod":"07/2020 - 02/2022","contentParagraphs":["Con il cambio di core-business aziendale, con focus sulla Data Analysis, ho sfruttato le mie competetnze per specializzarmi nella Data Visualization. Ho progettato e implementato interfacce di dashborading sfruttando principalmente il framework ReactJs."]},{"title":"Front-end Developer & Rich Media Support","place":"Weborama","placeUrl":"https://weborama.com/it/su-di-noi/","image":"https://lh3.googleusercontent.com/pw/AJFCJaVA2n3sIsQ_QlkFLbqRnOzLAdu0LhkhhyL_SiSWY7u9gTpfst7Lh81WVKmVda_0lemcUjDMr---6YD2OYQIKhhcbGpCEtdMc9kr3MvJBWVcmKO45xYUCy9V4mjpmkV7gZV3oEkhIn1pLwV146F8nK_KBw","timePeriod":"04/2015 - 06/2020","contentParagraphs":["Ho avuto modo di contribuire allo sviluppo di piattaforme online dedicate ai clienti e di tool interni oltre che di nuovi Ad-banner statici ed evoluti. Inoltre ho svolto attività diediting di video, audio e immagini per l’advertising online."]},{"title":"Java Developer","place":"ICAR-CNR","placeUrl":"https://www.icar.cnr.it/chi-siamo/","image":"https://lh3.googleusercontent.com/pw/AJFCJaUd_mmLcA2i0Bhs9v7zwnpjLnP4uhU93a1ELGLTrlbDmf5VXzBVaSZQXQDvjdhcGRW5x8an40Mp4PFg9d08W9Dnq6mWEATuu8KhDzdbC3_Zjyf4L-wHV9LpPZUoei6rf8AQkCnLJZaq6BOkSTb8N7EsHQ","timePeriod":"06/2013 - 10/2014","contentParagraphs":["Sono stato inserito in un gruppo di ricerca con l\'obiettivo di sviluppare un case tool che, mediante plug-in Eclipse, desse la possibilità di progettare software Agent-Oriented secondo la metodologia PASSI (Process for Agent Societies Specification and Implementation)."]}],"f3":[{"title":"Laurea 1° livello in Informatica","place":"Università degli studi di Palermo","placeUrl":"https://www.unipa.it/","image":"https://lh3.googleusercontent.com/pw/AJFCJaVqc6xhWkeYy7ZOPUagfC3OcVU8SzJU-KiwR9M4oP69k47iNcHgLfvVIJWo3M9Cg1pEoSfborKaK0CgekLfKbLG6c__yZiqWaKKJYRWNI5PlwUDQXAqMae3hQEUNmGMR9eMi7lOxIPf8re0xj5RpfX3Ug","timePeriod":"10/2010 - 03/2015"}],"pd":[{"title":"Clean Code","author":"Robert C. Martin","web":"https://www.goodreads.com/book/show/3735293-clean-code","image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg","contentParagraphs":["This gives us a lot of good tips to write better code. We need to code thinking others will read it.","I liked this book a lot. I tend to use these advices in the day by day coding, not all of them, you can pick the ones you find useful."]},{"title":"Clean Architecture","author":"Robert C. Martin","web":"https://www.goodreads.com/book/show/18043011-clean-architecture","image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1471680093l/18043011._SX318_.jpg","contentParagraphs":["This book is like an extension of Clean Code. It is like same principles applied to software architecture."]},{"title":".NET Microservices: Architecture for Containerized .NET Applications","author":"Cesar de la Torre, Bill Wagner, Mike Rousos","web":"https://docs.microsoft.com/en-us/dotnet/architecture/microservices/","image":"https://learn.microsoft.com/en-us/dotnet/architecture/microservices/media/cover-large.png","contentParagraphs":["Good book to get introduced into the microservices world. We can learn by actually coding a microservice.","We can find a lot of useful references here to dig into this world."]},{"title":"Cracking the Coding Interview","author":"Gayle Laakmann McDowell","web":"http://www.crackingthecodinginterview.com","image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1597774525l/55014663._SY475_.jpg","contentParagraphs":["Not only to prepare for coding interviews. This one teach you a lot of things that every software engineer needs to know."]},{"title":"Domain-Driven Design Distilled","author":"Vaughn Vernon","web":"https://www.goodreads.com/book/show/28602719-domain-driven-design-distilled","image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1453681660l/28602719.jpg","contentParagraphs":["\'The book\' to learn DDD."]},{"title":"Designing Data-Intensive Applications","author":"Martin Kleppmann","web":"https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications","image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1415816873l/23463279.jpg","contentParagraphs":["A long book, but this is like a mandatory reference for some software architecture sections.","You can find how different types of DBs are implemented or how distributed system manage replication."]},{"title":"System Design Interview - An insider\'s guide","author":"Alex Xu","web":"https://www.goodreads.com/book/show/54109255-system-design-interview-an-insider-s-guide","image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1592265780l/54109255._SY475_.jpg","contentParagraphs":["Very good to prepare your self to coding interviews\'s system design questions. But also have I have learned a lot of things regarding to software architecture and how big systems works.","Also, the references you can find here are gold."]},{"title":"System Design Interview - An insider\'s guide: Volume 2","author":"Alex Xu, Sahn Lam","web":"https://www.goodreads.com/book/show/60631342-system-design-interview-an-insider-s-guide","image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1647464389l/60631342._SX318_.jpg","contentParagraphs":["An extension of volume 1 with some more examples. As the first volume, this is very good. This one continues teaching us a lot of amazing stuffs.","Again, follow the references."]}]}');

/***/ })

};
;