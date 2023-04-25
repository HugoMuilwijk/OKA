// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// ▄██████▄ ██   ██ ▄█████▄         ██████▄ ██      ██████▄         ██ ▄██████
// ██    ██ ██  ██  ██   ██         ██   ██ ██      ██   ██         ██ ██
// ██    ██ █████   ███████         ██████  ██      ██   ██         ██ ▀█████▄
// ██    ██ ██  ██  ██   ██         ██   ██ ██      ██   ██    ██   ██      ██
// ▀██████▀ ██   ██ ██   ██ ███████ ██████▀ ███████ ██████▀ ██ ▀█████▀ ██████▀
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

// ▄▄▄▄ ╔═════════════╗
// ████ ║ BASE VALUES ║
// ▀▀▀▀ ╚═════════════╝

const base_url = window.location.hostname;
const intern_url = ['kpn.com','kpn.org','kpnnet.org','kpnnetwerk.nl'];
const intern_url1 = 'kpn.com';
const intern_url2 = 'kpn.org';
// const scope_limit = document.querySelector('[id^=SPAN] .leftHardAlignment, .container .flexbox-answer-details #content');
const scope_limit = document.querySelector('.imbodycontentbackground, #content');
// var viewport_height = document.documentElement.clientHeight;

// ▄▄▄▄ ╔═════════════════╗
// ████ ║ CODE COPY BUILD ║
// ▀▀▀▀ ╚═════════════════╝

// Adds the HTML code copy function to the buttons below the specific code.
var buttonCopy = document.querySelectorAll(".oka-code>.code-button")
for (i = 0; i < buttonCopy.length; i++) {
    buttonCopy[i].addEventListener('click', async function() {
        var copyCode = this.previousElementSibling.innerText;
        try {
            await navigator.clipboard.writeText(copyCode);
            buildToast(TXT_CodeCopy);
        } catch (error) {
            console.error('Copy failed: ', error);
        }
    });
}

// ▄▄▄▄ ╔═══════════════╗
// ████ ║ HEADING BUILD ║
// ▀▀▀▀ ╚═══════════════╝

scope_limit.querySelectorAll('.h2,.h3').forEach(function(heading) {
    heading.role = 'heading';
    heading.ariaLevel = 2;
    if (heading.classList.contains('h3')) {
        heading.ariaLevel = 3;
    }
});

// ▄▄▄▄ ╔═══════════════╗
// ████ ║ GALLERY BUILD ║
// ▀▀▀▀ ╚═══════════════╝

var gallery = 1;
var nongallery = 1;

scope_limit.querySelectorAll('img:not(.scale-icon):not(.scale-logo)').forEach(function(img) {
    const a = document.createElement('a');
    img.before(a);
    a.prepend(img);
    a.href = img.src;
    a.classList = img.classList;
    a.classList.add('glightbox');
    var parent = img.closest('.oka-column,.oka-steps,table');
    if (parent) {
        if (parent.parentElement.classList.contains('oka-steps')) {
            // console.log('sub step');
            parent.id = 'gallery'+gallery;
        };
        if (parent.id==''&&!parent.parentElement.classList.contains('oka-steps')) {
            parent.id = 'gallery'+gallery;
            // gallery++;
            gallery+=1;
        };
        a.setAttribute('data-gallery', gallery);
    } else {
    a.setAttribute('data-gallery', nongallery+100);
    nongallery++;
    nongallery+=1;
    };
    if (img.alt) {
    a.setAttribute('data-glightbox', 'description: '+img.alt);
    };
});

// ▄▄▄▄ ╔═══════════════╗
// ████ ║ IMG ALT BUILD ║
// ▀▀▀▀ ╚═══════════════╝

scope_limit.querySelectorAll('img').forEach(function(img) {
    if (img.alt=="") {
        img.alt = TXT_ImageAlt;
    }
});

// ▄▄▄▄ ╔═════════════╗
// ████ ║ TOAST BUILD ║
// ▀▀▀▀ ╚═════════════╝

var resetTimer = '';

function buildToast(message) {
    clearTimeout(resetTimer);
    timer = 5000;
    testpres = document.getElementById('oka-toast');
    if (testpres) {
        testpres.querySelector('article').innerHTML = message;
    } else {
        section = document.createElement('section');
        section.className = 'oka-toast';
        section.id = 'oka-toast';
        article = document.createElement('article');
        article.innerHTML = message;
        section.appendChild(article);
        scope_limit.appendChild(section);
    }
    resetTimer = setTimeout(function() {
        section.remove();
    }, timer);
}














function buildModal(message) {
    testpres = document.getElementById('oka-modal');
    if (testpres) {
        testpres.querySelector('article').innerHTML = message;
    } else {
        // body = document.body;
        section = document.createElement('section');
        section.className = 'oka-modal';
        section.id = 'oka-modal';
        article = document.createElement('article');
        article.innerHTML = message;
        search = document.createElement('div');
        input = document.createElement('input');
        input.type = 'search';
        input.placeholder = 'Search...';
        input.name = 'keyword';
        // input.addEventListener("input", performMark(input));
        section.appendChild(article);
        article.appendChild(search);
        search.appendChild(input);
        scope_limit.appendChild(section);
    }
}

// buildModal();






// ▄▄▄▄ ╔══════════════╗
// ████ ║ A HREF BUILD ║
// ▀▀▀▀ ╚══════════════╝

// Splits <a href> into 'internal' and 'external' links

const a = scope_limit.getElementsByTagName('a');

for(var i=0; i<a.length; i++) {
    const a_href = a[i].getAttribute('href');
	// check if contains base_url or ends with ID number
    // include !https:// option
    if (a[i].hasAttribute('href')&&!a[i].classList.contains('glightbox')) {
        if (a_href.startsWith('#')||a_href.includes(base_url)) {
            a[i].removeAttribute('rel');
            a[i].removeAttribute('target');
        } else {
            a[i].rel = "noopener nofollow";
            a[i].target = "_blank";
        }
        if (a_href.includes(intern_url1)||a_href.includes(intern_url2)) {
            a[i].classList.add('link-intern');
        }
    }
}

// document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         if(!!document.querySelector(this.getAttribute('href'))){
//             document.querySelector(this.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth', block: "center"
//             });
//         }
//     });
// });

// ▄▄▄▄ ╔═══════════════╗
// ████ ║ EXPANDS BUILD ║
// ▀▀▀▀ ╚═══════════════╝

const buildExpands = document.getElementsByClassName("oka-expands");

for (var i=0; i<buildExpands.length; i+=1) {
    buildExpands[i].role = "tablist";
    const expandsArticles = buildExpands[i].querySelectorAll(".oka-expands>article")
    // console.log(expandsArticles.length+'expandnumb');
    var j=0;
    for(const expandsArticle of expandsArticles) {
        var expandsH3 = expandsArticle.querySelector("h3");
        expandsH3.role = "tab";
        expandsH3.id = i+'_h3_'+j;
        expandsH3.setAttribute('aria-controls', i+'_div_'+j);
        expandsH3.ariaControls =
        expandsH3.ariaSelected = false;
        expandsH3.ariaExpanded = false;
        expandsH3.ariaPosInSet = j+1;
        expandsH3.ariaSetSize = expandsArticles.length;
        expandsH3.innerHTML = removeMark(expandsH3.innerHTML);

        var expandsDiv = expandsArticle.querySelector("div");
        expandsDiv.role = "tabpanel";
        expandsDiv.id = i+'_div_'+j;
        expandsDiv.setAttribute('aria-labelledby', i+'_h3_'+j);
        expandsDiv.ariaHidden = true;

        expandsArticle.role = "none";
        // Since expands and tabs are very similar in code, added +100 to prevent conflict.
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
        j+=1;
    };
};

function cleanTitle(title) {
    // For now this function is limited to <mark> elements. Might expand on this to enclude all elements
    // because of screenreaders and issues with extra elements inside titles.
    var cleanTitle = title.replace(/(<\/?mark)(.*?)[>$]/g, "");
    title = cleanTitle;
    return title;
}

function removeMark(string) {
    // For now this function is limited to <mark> elements. Might expand on this to enclude all elements
    // because of screenreaders and issues with extra elements inside titles.
    var removeMark = string.replace(/(<\/?mark)(.*?)[>$]/g, "");
    return removeMark;
}

function createMenuButton(title) {
    let createButton = document.createElement('button');
    createButton.type = 'button';
    // cleanText = title.replace(/(<\/?mark)(.*?)[>$]/g, "");
    createButton.innerHTML =  title.replace(/(<\/?mark)(.*?)[>$]/g, "");
    return createButton;
}

// ▄▄▄▄ ╔════════════╗
// ████ ║ TABS BUILD ║
// ▀▀▀▀ ╚════════════╝

const buildTabs = document.getElementsByClassName('oka-tabs');

for (var i=0; i<buildTabs.length; i+=1) {
    const tabsContent = document.createElement('section');
    const tabsMenu = document.createElement('section');
    tabsMenu.className = 'oka-tabs-menu';
	buildTabs[i].prepend(tabsContent);
	buildTabs[i].prepend(tabsMenu);
	const tabsArticles = buildTabs[i].querySelectorAll('.oka-tabs>article');
    var j=0;
	for(const tabsArticle of tabsArticles) {
        var tabsH3 = tabsArticle.querySelector("h3");
        tabsH3.innerHTML = removeMark(tabsH3.innerHTML);
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

        j+=1;
	};
};

const labels = document.querySelectorAll(".oka-expands>article>h3");

const tabs = document.querySelectorAll(".oka-tabs>section:first-child>button");

const tabslabels = document.querySelectorAll(".oka-tabs>section:nth-child(2)>article>h3");

// ▄▄▄▄ ╔═════════════════════╗
// ████ ║ EXPANDS/TABS TOGGLE ║
// ▀▀▀▀ ╚═════════════════════╝

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
                    var h3test = tabItem.querySelector('h3');
                    h3test.ariaSelected = false;
                    h3test.ariaExpanded = false;
                    // var divtest = tabItem.querySelector('div');
                    // divtest = ariaHidden = true;
                } else {
                    tabItem.classList.add("oka-tab-active");
                    var h3test = tabItem.querySelector('h3');
                    h3test.ariaSelected = true;
                    h3test.ariaExpanded = true;
                    // var divtest = tabItem.querySelector('div');
                    // divtest = ariaHidden = false;
                }
			}
		}
	});

	tabslabels.forEach(function(label) {
		const tabItem = label.parentElement;
		if (tabItem.dataset.tabGroup === group) {
			if (tabItem.dataset.tabId === id) {
                tabItem.classList.add("oka-tab-active");
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
                tabMenu.scroll({ left: tabPos+tabWidth/2-tabMenu.clientWidth/2, behavior: 'smooth' });
			} else {
				tab.classList.remove("oka-tab-active");
			}
		}
	});
}

labels.forEach(function(label) {
	label.addEventListener("click", toggleShow);
});

tabs.forEach(function(tab) {
	tab.addEventListener("click", toggleShow);
});

tabslabels.forEach(function(tablabel) {
	tablabel.addEventListener("click", toggleShow);
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


// ▄▄▄▄ ╔════════════════════════════╗
// ████ ║ OKA-TABS HORIZONTAL SCROLL ║
// ▀▀▀▀ ╚════════════════════════════╝

const scrollContainerGroup = document.querySelectorAll(".oka-tabs>section:first-child");

function checkHorizontalScroll(){
    scrollContainerGroup.forEach(scrollContainer => {
        var enableHorizontalScroll = function(scrollHor) {
            scrollHor.preventDefault();
            scrollContainer.scrollLeft += scrollHor.deltaY;
        };
        if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            scrollContainer.addEventListener('wheel', enableHorizontalScroll, true);
        } else {
            // RemoveEventListener doesn't seem to work in this case. Left in code because it should.
            // Resulting error is minimal and only 'visible' after font zoom switching on oka-tabs menu bar. ('F5' fixes issue)
            scrollContainer.removeEventListener('wheel', enableHorizontalScroll, true);
        }
    });
}

checkHorizontalScroll()

// ▄▄▄▄ ╔═══════════════════╗
// ████ ║ GLIGHTBOX OPTIONS ║
// ▀▀▀▀ ╚═══════════════════╝

const lightbox = GLightbox({
    moreText: 'Toon meer',
    moreLength: 45,
    svg: {
        close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="8,6 12,2 14,4 10,8 14,12 12,14 8,10 4,14 2,12 6,8 2,4 4,2"/></svg>',
        next: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="13,8 7,14 5,12 9,8 5,4 7,2"/></svg>',
        prev: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="3,8 9,2 11,4 7,8 11,12 9,14"/></svg>'
    }
});

// Glightbox has some issues with accepting the 'enter' button when allready opened.
// This results in an infinite opening animation (and eventually some interesting errors).
// Code below is a simple solution to prevent enter when Glightbox is opened.
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



// Create an instance of mark.js and pass an argument containing
// the DOM object of the context (where to search for matches)
var markInstance = new Mark(document.querySelector("#content"));
// Cache DOM elements
var keywordInput = document.querySelector("input[name='keyword']");
var optionInputs = document.querySelectorAll("input[name='opt[]']");

function performMark() {

  // Read the keyword
  var keyword = keywordInput.value;

  // Determine selected options
  var options = {};
  [].forEach.call(optionInputs, function(opt) {
    options[opt.value] = opt.checked;
  });

  // Remove previous marked elements and mark
  // the new keyword inside the context
  markInstance.unmark({
  	done: function(){
    	markInstance.mark(keyword, options);
    }
  });
};

// Listen to input and option changes
keywordInput.addEventListener("input", performMark);
for (var i = 0; i < optionInputs.length; i++) {
  optionInputs[i].addEventListener("change", performMark);
}
