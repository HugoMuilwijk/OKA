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










const scrollContainerGroup = document.querySelectorAll(".tabs>section:first-child");

scrollContainerGroup.forEach(scrollContainer => {
	scrollContainer.addEventListener("wheel", (scrollHor) => {
		scrollHor.preventDefault();
		scrollContainer.scrollLeft += scrollHor.deltaY;
	});
});



const a = document.getElementsByTagName('a');

// var r = new RegExp('^([a-z]+:|//)', 'i');

// var q = new RegExp('(?!oka\.test$)', 'i');

for(var i=0; i<a.length; i++) {
    const a_href = a[i].getAttribute('href');
	// check if contains base_url or ends with ID number
	// check Oracle output of url for best regex
    if (a_href.startsWith('#')||a_href.includes(base_url)) {
		a[i].removeAttribute('target');
		a[i].removeAttribute('rel');
    } else {
		a[i].target = "_blank";
		a[i].rel = "nofollow"
    }
}

const td = document.getElementsByTagName('td');

for(var i=0; i<td.length; i++) {
	
	// const td_num = td[i].innerHTML;
	// const found = td[i].innerHTML.match(new RegExp("^-?[0-9][0-9,\.]+$"));
	if (td[i].innerHTML.match(new RegExp("^-?[0-9][0-9,\.\-]+$"))) {
		td[i].classList.add('right');
	}
};

function createMenuButton(name) {
    let button = document.createElement('button');
    button.textContent = name;
    return button;
}

const b = document.getElementsByClassName("pretabs");
console.log(b);
const section = document.createElement("section");



for(var i=0; i<b.length; i++) {
	b[i].prepend(section);
	const htest = b[i].getElementsByTagName('h3');
	for(const ftest of htest) {
		console.log(ftest.innerHTML);
		ftest.className = 'remove_element';
	};

	// console.log(htest);
	// htest.partentNode.removeChild(htest);

}

const remove = document.querySelectorAll('.remove_element');

remove.forEach(remove_element => {
	remove_element.remove();
});

const labels = document.querySelectorAll(".expands article h3, .tabs section article h3");
const tabs = document.querySelectorAll(".tabs section button");

console.log(tabs);

function toggleShow() {
	const target = this;
	const item = target.classList.contains("tab-menu")
		? target
		: target.parentElement;
	const group = item.dataset.tabGroup;
	const id = item.dataset.tabId;

	tabs.forEach(function(tab) {
		if (tab.dataset.tabGroup === group) {
			if (tab.dataset.tabId === id) {
				tab.classList.add("tab-active");
				tab.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
			} else {
				tab.classList.remove("tab-active");
			}
		}
	});

	labels.forEach(function(label) {
		const tabItem = label.parentElement;

		if (tabItem.dataset.tabGroup === group) {
			if (tabItem.dataset.tabId === id) {
				tabItem.classList.add("tab-active");
				// tabItem.scrollIntoView();
			} else {
				tabItem.classList.remove("tab-active");
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