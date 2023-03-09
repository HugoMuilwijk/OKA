// ==================================================
// =================== BASE VALUES ==================

const base_url = window.location.hostname;
const intern_url1 = 'kpn.com';
const intern_url2 = 'kpn.org';
const scope_limit = document.querySelector('[id^=SPAN] .leftHardAlignment, .container .flexbox-answer-details #content');
const scope_limit = document.querySelector('.imbodycontentbackground, #content');
var viewport_height = document.documentElement.clientHeight;

// ==================================================
// ================= BASE FUNCTIONS =================

// Basic throttle function, usefull for lightweight screen resize callback
function throttle (callback, limit) {
    var wait = false;
    return function () {
        if (!wait) {
            callback.apply(null, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
}




var gallery = 1;
var nongallery = 1;

scope_limit.querySelectorAll('img:not(.scale-icon)').forEach(function(img) {

    const a = document.createElement('a');
    img.before(a);
    a.prepend(img);
    a.href = img.src;
    a.classList = img.classList;
    a.classList.add('glightbox');



    var parent = img.closest('.oka-column,.oka-steps');
    if (parent) {
        if (parent.id=='') {
            parent.id = 'gallery'+gallery;
            console.log('123');
            gallery++
        }
        a.setAttribute('data-gallery', gallery);
    } else {
    a.setAttribute('data-gallery', nongallery+100);
    nongallery++
    }

    
    a.setAttribute('data-glightbox', 'description: '+img.alt);

});




















// window.addEventListener('resize', throttle(function(event) {
//     viewport_height = document.documentElement.clientHeight;
//     document_height = document.documentElement.scrollHeight;
//     document_scroll = document.documentElement.scrollTop;
//     console.log(viewport_height);
//     console.log(document_height);
//     console.log(document_scroll);
//     if(document_height > 2*viewport_height){
//         console.log('Show scroll-to-top');
//     };
// }, 1000));



// const img = scope_limit.querySelectorAll('img');

scope_limit.querySelectorAll('img').forEach(function(img) {
    if (img.alt=="") {
        if (navigator.language == 'nl') {
            img.alt = "Leeg";
        } else {
            img.alt = "Empty";
        };
    }

    // img.onerror = function() {
    //     if (navigator.language == 'nl') {
    //         img.alt = "Fout";
    //     } else {
    //         img.alt = "Error";
    //     };
    // }
});

// scope_limit.querySelectorAll('img').forEach(function(img) {
//     img.onerror = function() {
//         if (navigator.language == 'nl') {
//             img.alt = "Fout";
//         } else {
//             img.alt = "Error";
//         };
//     }
// });






// function buildAlert(message) {

//     // body = document.body;
//     section = document.createElement('section');
//     section.className = 'oka-toaster';
//     article = document.createElement('article');
//     article.innerHTML = message;
//     section.appendChild(article);

//     scope_limit.appendChild(section);

//     setTimeout(function(){
//         section.remove();
//     },5000);
// }

// document.addEventListener('keydown', function(e) {
//     if (e.ctrlKey && e.code === 'KeyF') {
//         e.preventDefault();
//         buildAlert('<kbd>Ctrl</kbd> <kbd>F</kbd>');
//         console.log('Prevented a Ctrl+F')
//     }
// });


/* ================================================== */
/* ===================== A HREF ===================== */

// Splits <a href> into 'internal' and 'external' links

const a = scope_limit.getElementsByTagName('a:not(.glightbox)');

for(var i=0; i<a.length; i++) {
    const a_href = a[i].getAttribute('href');
	// check if contains base_url or ends with ID number
    // include !https:// option
    // className != 'glightbox doesn't really do anything (if multiple classes) REMOVE!
    if (a[i].hasAttribute('href')&&a[i].className != 'glightbox') {
        if (a_href.startsWith('#')||a_href.includes(base_url)) {
            a[i].removeAttribute('target');
            a[i].removeAttribute('rel');
        } else {
            a[i].rel = "noopener nofollow";
            a[i].target = "_blank";
        }
        if (a_href.includes(intern_url1)||a_href.includes(intern_url2)) {
            a[i].classList.add('link-intern');
        }
    }
}

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if(!!document.querySelector(this.getAttribute('href'))){
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth', block: "center"
            });
        }
    });
});

/* ================================================== */
/* ====================== TABLE ===================== */

// Forces mono font on cells with only numbers

// const td = document.getElementsByTagName('td');

// for(var i=0; i<td.length; i++) {
// 	if (td[i].innerHTML.match(new RegExp("^-?[0-9][0-9,\.\-]+$"))) {
// 		td[i].classList.add('numeric');
// 	}
// };

// Copies all the code in the element to the clipboard

var buttonCopy = document.querySelectorAll(".oka-code>.code-button")
for (i = 0; i < buttonCopy.length; i++) {
    buttonCopy[i].addEventListener('click', async function() {
        var copyCode = this.previousElementSibling.innerText;
        try {
            await navigator.clipboard.writeText(copyCode);
            if (navigator.language == 'nl') {
                alert('HTML code gekopieerd naar klembord')
            } else {
                alert('HTML code copied to clipboard')
            };
        } catch (error) {
            console.error('Copy failed: ', error);
        }
    });
}

// tabs and expands code


const buildExpands = document.getElementsByClassName("oka-expands");

for (var i=0; i<buildExpands.length; i++) {
    const expandsArticles = buildExpands[i].querySelectorAll(".oka-expands>article")
    var j=0;
    for(const expandsArticle of expandsArticles) {
        var expandsH3 = expandsArticle.querySelector("h3");
        expandsH3.innerHTML = cleanTitle(expandsH3.innerHTML);
        expandsArticle.setAttribute('data-tab-group', i+100);
        expandsArticle.setAttribute('data-tab-id', j+100);

        // if (j==1) {
        //     var previousArticle = expandsArticle.previousElementSibling;
        //     if (previousArticle!=null) {
        //         console.log(previousArticle);

        //         previousArticle.querySelector('h3').append(document.createElement('button'));
        //         var expandButton = previousArticle.querySelector('h3>button');
        //         console.log(expandButton);
        //         if (navigator.language == 'nl') {
        //             expandButton.innerText = ('Alles uitklappen');
        //         } else {
        //             expandButton.innerText = ('Expand all');
        //         };
        //         // expandButton.innerText = ('Collapse all');
        //         // expandButton.innerText = ('Alles inklappen');
        //         expandButton.type = 'button';
        //         expandButton.className = 'expands-button';
        //     }
        // }
        j++;
    };
};

function cleanTitle(title) {
    var cleanTitle = title.replace(/(<\/?mark)(.*?)[>$]/g, "");
    title = cleanTitle;
    return title;
}

function createMenuButton(name) {
    let button = document.createElement('button');
    button.type = 'button';
    cleanText = name.replace(/(<\/?mark)(.*?)[>$]/g, "");
    button.innerHTML =  cleanText;
    return button;
}

const buildTabs = document.getElementsByClassName('oka-tabs');

for (var i=0; i<buildTabs.length; i++) {
    const tabsContent = document.createElement('section');
    const tabsMenu = document.createElement('section');
    tabsMenu.className = 'oka-tabs-menu';
	buildTabs[i].prepend(tabsContent);
	buildTabs[i].prepend(tabsMenu);
	const tabsArticles = buildTabs[i].querySelectorAll('.oka-tabs>article');
    var j=0;
	for(const tabsArticle of tabsArticles) {
        var tabsH3 = tabsArticle.querySelector("h3");
        tabsH3.innerHTML = cleanTitle(tabsH3.innerHTML);
        tabsArticle.setAttribute('data-tab-group', i);
        tabsArticle.setAttribute('data-tab-id', j);

        const menuButton = tabsMenu.appendChild(createMenuButton(tabsArticle.firstElementChild.innerHTML));
        menuButton.setAttribute('data-tab-group', i);
        menuButton.setAttribute('data-tab-id', j);
        menuButton.className = 'oka-tabs-button';

        if (j==0) {
            menuButton.classList.add('oka-tab-active');
            tabsArticle.classList.add('oka-tab-active');
        }

        tabsContent.append(tabsArticle);

        j++;
	};
};



// Quick-fixed i and j to high numbers to resolve conflict with tabs

const labels = document.querySelectorAll(".oka-expands>article>h3");

const tabs = document.querySelectorAll(".oka-tabs>section:first-child>button");

const tabslabels = document.querySelectorAll(".oka-tabs>section:nth-child(2)>article>h3");

// console.log(tabs);

// function toggleShow() {
// 	const target = this;
// 	const item = target.parentElement;
// 	const group = item.dataset.tabGroup;
// 	const id = item.dataset.tabId;

// 	labels.forEach(function(label) {
// 		const tabItem = label.parentElement;

// 		if (tabItem.dataset.tabGroup === group) {
// 			if (tabItem.dataset.tabId === id) {
//                 if (tabItem.classList == "oka-tab-active") {
//                     tabItem.classList.remove("oka-tab-active");
//                 } else {
//                     tabItem.classList.add("oka-tab-active");
//                 }
// 			} else {
// 			}
// 		}
// 	});
// }

function toggleShow() {
	const target = this;
	const item = target.classList.contains("oka-tabs-button")
	    ? target
		: target.parentElement;
	const group = item.dataset.tabGroup;
	const id = item.dataset.tabId;

    labels.forEach(function(label) {
		const tabItem = label.parentElement;

		if (tabItem.dataset.tabGroup === group) {
			if (tabItem.dataset.tabId === id) {
                if (tabItem.classList == "oka-tab-active") {
                    tabItem.classList.remove("oka-tab-active");
                } else {
                    tabItem.classList.add("oka-tab-active");
                    // window.scroll({ top: tabItem.offsetTop-(viewport_height/8), left: 0, behavior: 'smooth' });
                }
                // window.scroll({ top: tabItemscroll.offsetTop-(viewport_height/8), left: 0, behavior: 'smooth' });
			} else {
				// tabItem.classList.remove("oka-tab-active");
			}
		}
	});

	tabslabels.forEach(function(label) {
		const tabItem = label.parentElement;
		if (tabItem.dataset.tabGroup === group) {
			if (tabItem.dataset.tabId === id) {
                tabItem.classList.add("oka-tab-active");
                // window.scroll({ top: tabItem.offsetTop-(viewport_height/8), left: 0, behavior: 'smooth' });
                // window.scroll({ top: tabItemscroll.offsetTop-(viewport_height/8), left: 0, behavior: 'smooth' });
			} else {
				tabItem.classList.remove("oka-tab-active");
			}
		}
	});

    tabs.forEach(function(tab) {
		if (tab.dataset.tabGroup === group) {
			if (tab.dataset.tabId === id) {
				tab.classList.add("oka-tab-active");
                const tabMenu = tab.parentElement;
                const tabWidth = tab.clientWidth;
                const tabPos = tab.offsetLeft;
                // console.log(tabMenu.scrollWidth);
                // console.log(tabMenu.clientWidth);
                // console.log(tabPos);
                // console.log(tabWidth);
                // console.log(tabMenu.parentElement.offsetTop-(viewport_height/8));
                tabMenu.scroll({ left: tabPos+tabWidth/2-tabMenu.clientWidth/2, behavior: 'smooth' });
                // window.scroll({ top: tabMenu.parentElement.offsetTop-(viewport_height/8), left: 0, behavior: 'smooth' });
			} else {
				tab.classList.remove("oka-tab-active");
			}
		}
	});
}

labels.forEach(function(label) {
	label.addEventListener("click", toggleShow);
    // console.log('label each')
});

tabs.forEach(function(tab) {
	tab.addEventListener("click", toggleShow);
    // console.log('tab each')
});

tabslabels.forEach(function(tablabel) {
	tablabel.addEventListener("click", toggleShow);
    // console.log('tab each')
});

function toggleShowAll() {
	const target = this;
    var testviasz = target.parentElement.parentElement;
    testviasz.classList.remove('oka-tab-active');
    var testvias = target.parentElement.parentElement.parentElement.querySelectorAll('article');
    for(const testvia of testvias) {
        testvia.classList.remove('oka-tab-active');
        testvia.classList.toggle('oka-all-active');
    };
}

const labelsbut = document.querySelectorAll(".expands-button");

labelsbut.forEach(function(label) {
	label.addEventListener("click", toggleShowAll);
    // console.log('label each')
});

const scrollContainerGroup = document.querySelectorAll(".oka-tabs>section:first-child");

scrollContainerGroup.forEach(scrollContainer => {
    if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        scrollContainer.addEventListener("wheel", (scrollHor) => {
            scrollHor.preventDefault();
            scrollContainer.scrollLeft += scrollHor.deltaY;
        });
    }
});







const lightbox = GLightbox({
    moreText: 'Toon meer',
    moreLength: 45,
    svg: {
        close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="8,6 12,2 14,4 10,8 14,12 12,14 8,10 4,14 2,12 6,8 2,4 4,2"/></svg>',
        next: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="13,8 7,14 5,12 9,8 5,4 7,2"/></svg>',
        prev: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="3,8 9,2 11,4 7,8 11,12 9,14"/></svg>'
    }
});

var preventEnter = function(e) {
    // keyCode === 13 selects both the 'normal' enter and numpad enter.
    if (e.keyCode === 13) {
        e.preventDefault();
    }
};

lightbox.on('open', () => {
    document.addEventListener('keydown', preventEnter, true);
});

lightbox.on('close', () => {
    document.removeEventListener('keydown', preventEnter, true);
});