let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.querySelector('#ul-el');
const deleteBtn = document.querySelector('#delete-btn');
const tabBtn = document.querySelector('#tab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	console.log(myLeads);
	renderArray(myLeads);
}

console.log(`storage leads: ${myLeads}`);

//_______EVENT LISTENERS___________
inputBtn.addEventListener('click', saveLeads);

deleteBtn.addEventListener('click', clearStorage);

tabBtn.addEventListener('click', saveCurrentTab);

//_____________FUNCTIONS______________

function renderArray(leadArray) {
	let listItems = '';
	leadArray.forEach(
		lead =>
			(listItems += `
				<li>
					<a href='${lead}'' target='_blank'>${lead}</a>
				</li>
				`)
	);

	ulEl.innerHTML = listItems;
}

function clearStorage() {
	localStorage.clear();
	console.log('storage cleared');
	myLeads = [];
	renderArray(myLeads);
}

function saveLeads() {
	myLeads.push(inputEl.value);
	console.log(myLeads);
	inputEl.value = '';

	let stringLeads = JSON.stringify(myLeads);
	localStorage.setItem('myLeads', stringLeads);

	renderArray(myLeads);

	console.log(`This is from local storage: ${localStorage.getItem('myLeads')}`);
}

function saveCurrentTab() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		myLeads.push(tabs[0].url);
		localStorage.setItem('myLeads', JSON.stringify(myLeads));
		renderArray(myLeads);
	});
}
