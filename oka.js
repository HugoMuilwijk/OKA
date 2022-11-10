const base_url = window.location.hostname;
const rn_structure = '.rn_Container';
const viewport_height = document.documentElement.clientHeight;
// on viewport update, update this value

// const scrollLink = document.querySelector("a#scroll-to-element"),
//       targetElement = document.querySelector("#target-element");
// 	  console.log(targetElement.offsetHeight);

// scrollLink.addEventListener("click", function(e) {
//   e.preventDefault();
//   if (targetElement.offsetHeight > viewport_height) {
// 	window.scroll({ top: targetElement.offsetTop-(viewport_height/8), left: 0, behavior: 'smooth' });
//   } else {
// 	window.scroll({ top: targetElement.offsetTop-(viewport_height/2)+(targetElement.offsetHeight/2), left: 0, behavior: 'smooth' });
//   };  
// })

// Splits <a href> into 'internal' and 'external' links

// const a = document.getElementsByTagName('a');

// for(var i=0; i<a.length; i++) {
//     const a_href = a[i].getAttribute('href');
// 	// check if contains base_url or ends with ID number
// 	// check Oracle output of url for best regex
//     if (a_href.startsWith('#')||a_href.includes(base_url)) {
// 		a[i].removeAttribute('target');
// 		a[i].removeAttribute('rel');
//     } else {
// 		a[i].target = "_blank";
// 		a[i].rel = "nofollow"
//     }
// }

// Aligns numeric content to the right and forces mono font

const td = document.getElementsByTagName('td');

for(var i=0; i<td.length; i++) {
	// add euro symbol
	if (td[i].innerHTML.match(new RegExp("^-?[0-9][0-9,\.\-]+$"))) {
		td[i].classList.add('right');
	}
};

// Copies all the code in the element to the clipboard

var buttonCopy = document.querySelectorAll(".oka-code button")
for (i = 0; i < buttonCopy.length; i++) {
  buttonCopy[i].addEventListener('click', async function() {
    var copyCode = this.previousElementSibling.innerText;
    try {
      await navigator.clipboard.writeText(copyCode);
	  alert('HTML code copied to clipboard')
    } catch (error) {
      console.error('Copy failed: ', error);
    } 
  });
}

// tabs and expands code

function createMenuButton(name) {
    let button = document.createElement('button');
    button.textContent = name;
    return button;
}

const pretabs = document.getElementsByClassName("oka-tabs");

for (var i=0; i<pretabs.length; i++) {
    const sectiont = document.createElement("section");
    const section = document.createElement("section");
    section.className = 'oka-tabs-menu';
	pretabs[i].prepend(sectiont);
	pretabs[i].prepend(section);
	const htest = pretabs[i].querySelectorAll(".oka-tabs>article")
    var j=0;
	for(const ftest of htest) {
        const htester = ftest.firstElementChild;
        console.log(htester.innerHTML);


        ftest.setAttribute ('data-tab-group', i);
        ftest.setAttribute ('data-tab-id', j);
        

        const menuButton = section.appendChild(createMenuButton(htester.innerHTML));
        menuButton.setAttribute ('data-tab-group', i);
        menuButton.setAttribute ('data-tab-id', j);
        menuButton.className = 'oka-tabs-button';

        if (j==0) {
        menuButton.classList.add("oka-tab-active");
        ftest.classList.add("oka-tab-active");
        }
		// console.log(ftest);
		console.log(ftest.innerHTML);
		// ftest.className = 'remove_element';


        sectiont.append(ftest);


        j++;
	};

	// console.log(htest);
	// htest.partentNode.removeChild(htest);

};

const preexpands = document.getElementsByClassName("oka-expands");

for (var i=100; i<preexpands.length; i++) {
    const qtest = preexpands[i].querySelectorAll(".oka-expands>article")
    var j=100;
    for(const rtest of qtest) {
        rtest.setAttribute ('data-tab-group', i);
        rtest.setAttribute ('data-tab-id', j);
        j++;
    };

};

// Quick-fixed i and j to high numbers to resolve conflict with tabs

// const remove = document.querySelectorAll('.remove_element');

// remove.forEach(remove_element => {
// 	remove_element.remove();
// });

const labels = document.querySelectorAll(".oka-expands article h3, .oka-tabs section article h3");
const tabs = document.querySelectorAll(".oka-tabs section button");

console.log(tabs);

function toggleShow() {
	const target = this;
	const item = target.classList.contains("oka-tabs-button")
		? target
		: target.parentElement;
	const group = item.dataset.tabGroup;
	const id = item.dataset.tabId;

	tabs.forEach(function(tab) {
		if (tab.dataset.tabGroup === group) {
			if (tab.dataset.tabId === id) {
				tab.classList.add("oka-tab-active");
				tab.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
			} else {
				tab.classList.remove("oka-tab-active");
			}
		}
	});

	labels.forEach(function(label) {
		const tabItem = label.parentElement;

		if (tabItem.dataset.tabGroup === group) {
			if (tabItem.dataset.tabId === id) {
				tabItem.classList.add("oka-tab-active");
				// tabItem.scrollIntoView();
                tabItem.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
			} else {
				tabItem.classList.remove("oka-tab-active");
			}
		}
	});
}

tabs.forEach(function(tab) {
	tab.addEventListener("click", toggleShow);
});

labels.forEach(function(label) {
	label.addEventListener("click", toggleShow);
});



const scrollContainerGroup = document.querySelectorAll(".oka-tabs>section:first-child");

scrollContainerGroup.forEach(scrollContainer => {
	scrollContainer.addEventListener("wheel", (scrollHor) => {
		scrollHor.preventDefault();
		scrollContainer.scrollLeft += scrollHor.deltaY;
	});
});



/* =====================================================================
 * Lightbox.js
 * Version: 0.0.6
 * Author: Victor Diego <victordieggo@gmail.com>
 * License: MIT
 * ================================================================== */

(function () {

    'use strict';

    var animation, body, btnClose, btnNav, currentItem, container, content, wrapper, trigger, currentTrigger;

    body = document.body;

    trigger = body.querySelectorAll('[data-lightbox],img');

    animation = {
        fadeIn: 'fadeIn .2s',
        fadeOut: 'fadeOut .2s',
        scaleIn: 'createBox .2s',
        scaleOut: 'deleteBox .2s'
    };

    function toggleScroll() {
      body.classList.toggle('remove-scroll');
    }

    function sortContent(content) {
        var image, imageAlt, video, href = content.getAttribute('href'), src = content.getAttribute('src');

		if (src.match(/\.(jpeg|jpg|gif|png)/)) {
            image = document.createElement('img');
            image.className = 'lightbox-image';
            image.src = src;
            image.alt = content.getAttribute('alt');
            // imageAlt = document.createElement('div');
            // imageAlt.innerHTML = image.alt;
            const p = document.createElement('p');
            p.innerText = 'This is JavaScript DOM after() method demo';
            // image.parentElement =+ 'test';
            image.after(p);
            console.log(p);

            
            return image;
        }

        if (href.match(/\.(jpeg|jpg|gif|png)/)) {
            image = document.createElement('img');
            image.className = 'lightbox-image';
            image.src = href;
            image.alt = content.getAttribute('data-image-alt');
            
            return image;
        }

        // if (href.match(/(youtube|vimeo)/)) {
        //     video = [];
        //     if (href.match('youtube')) {
        //         video.id = href.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
        //         video.url = 'www.youtube.com/embed/';
        //         video.options = '?autoplay=1&rel=0';
        //     }
        //     if (href.match('vimeo')) {
        //         video.id = href.split(/video\/|https:\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
        //         video.url = 'player.vimeo.com/video/';
        //         video.options = '?autoplay=1title=0&byline=0&portrait=0';
        //     }
        //     video.player = document.createElement('iframe');
        //     video.player.setAttribute('allowfullscreen', '');
        //     video.player.className = 'lightbox-video-player';
        //     video.player.src = 'https://' + video.url + video.id + video.options;
        //     video.wrapper = document.createElement('div');
        //     video.wrapper.className = 'lightbox-video-wrapper';
        //     video.wrapper.appendChild(video.player);
        //     return video.wrapper;
        // }

        return body.querySelector(href).children[0].cloneNode(true);
    }

    function galleryItens(element) {
        var itens = {
                next: element.parentElement.nextElementSibling,
                previous: element.parentElement.previousElementSibling,
                up: element.parentElement.parentElement.previousElementSibling
            },
            key;
        for (key in itens) {
            
            if (itens[key] !== null) {
                itens[key] = itens[key].querySelector('[data-lightbox]');
            }
        }
        return itens;
    }

    function buildLightbox(element) {
        element.blur();
        currentItem = element;
        element.classList.add('current-lightbox-item');

        btnClose = document.createElement('button');
        btnClose.className = 'lightbox-btn lightbox-btn-close';

        content = document.createElement('div');
        content.className = 'lightbox-content';
        content.appendChild(sortContent(element));

        wrapper = content.cloneNode(false);
        wrapper.className = 'lightbox-wrapper';
        wrapper.style.animation = [animation.scaleIn, animation.fadeIn];
        wrapper.appendChild(content);
        wrapper.appendChild(btnClose);

        container = content.cloneNode(false);
        container.className = 'lightbox-container';
        container.style.animation = animation.fadeIn;
        container.onclick = function() {};
        container.appendChild(wrapper);

        if (element.getAttribute('data-lightbox') === 'gallery') {
            container.classList.add('lightbox-gallery');
            var key;
            btnNav = {next: '', previous: '', up: ''};
            for (key in btnNav) {
                if (btnNav.hasOwnProperty(key)) {
                    btnNav[key] = btnClose.cloneNode(false);
                    btnNav[key].className = 'lightbox-btn lightbox-btn-' + key;
                    btnNav[key].disabled = galleryItens(element)[key] === null ? true : false;
                    wrapper.appendChild(btnNav[key]);
                }
            }
        }

        body.appendChild(container);
        toggleScroll();
    }

    function galleryNavigation(position) {
        wrapper.removeAttribute('style');
        var item = galleryItens(currentItem)[position],
            key;
        if (item !== null) {
            content.style.animation = animation.fadeOut;
            setTimeout(function () {
                content.replaceChild(sortContent(item), content.children[0]);
                content.style.animation = animation.fadeIn;
            }, 100);
            currentItem.classList.remove('current-lightbox-item');
            item.classList.add('current-lightbox-item');
            currentItem = item;
            for (key in btnNav) {
                if (btnNav.hasOwnProperty(key)) {
                    btnNav[key].disabled = galleryItens(item)[key] === null ? true : false;
                    console.log(key);
                }
            }
        }
    }

    function closeLightbox() {
        container.style.animation = animation.fadeOut;
        wrapper.style.animation = [animation.scaleOut, animation.fadeOut];
        setTimeout(function () {
            if (body.contains(container)) {
                body.removeChild(container);
                currentTrigger.focus();
                currentItem.classList.remove('current-lightbox-item');
                toggleScroll();
            }
        }, 100);
    }

    Array.prototype.forEach.call(trigger, function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            buildLightbox(element);
            currentTrigger = element;
        });
    });

    ['click', 'keyup'].forEach( function (eventType) {
        body.addEventListener(eventType, function (event) {
            if (body.contains(container)) {
                var target = event.target,
                    key = event.keyCode,
                    type = event.type;
                if ([container, btnClose].indexOf(target) !== -1 || key === 27) {
                    closeLightbox();
                }
                if (container.classList.contains('lightbox-gallery')) {
                    if ((target === btnNav.next && type === 'click') || key === 39) {
                        galleryNavigation('next');
                    }
                    if ((target === btnNav.previous && type === 'click') || key === 37) {
                        galleryNavigation('previous');
                    }
                    if ((target === btnNav.up && type === 'click') || key === 38) {
                        galleryNavigation('up');
                    }
                }
            }
        });
    });

}());