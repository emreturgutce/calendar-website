let now = moment();
const days = [1, 2, 3, 4, 5, 6, 0];

const myTable = document.querySelector('#my-table');
const monthName = document.querySelector('#month-name');
const myDateDay = document.querySelector('.my-date-day');
const myDateDate = document.querySelector('.my-date-date');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const myYear = document.querySelector('.my-year');
const myDate = document.querySelector('.my-date');
const table = document.querySelector('table');
const wrapper = document.querySelector('.card-wrapper');

let currEl;
let todayEl;
let counterTask = 0;

const monthStrg = now.locale('tr').format('MMMM');
const dayNumberStr = now.locale('tr').format('DD');
const dayStr = now.locale('tr').format('dddd');

myDateDay.innerHTML = dayStr;
myDateDate.innerHTML = `${dayNumberStr} ${monthStrg}`;

const doc = {};

prev.addEventListener('click', () => {
	now = now.clone().subtract(1, 'month');
	month();
	table.classList.add('left-to-center');
	setTimeout(() => {
		table.classList.remove('left-to-center');
	}, 500);
});

next.addEventListener('click', () => {
	now = now.clone().add(1, 'month');
	month();
	table.classList.add('right-to-center');
	setTimeout(() => {
		table.classList.remove('right-to-center');
	}, 500);
});

month();


document.querySelectorAll('.daysOfMonth').forEach((el) =>{
	if (myDateDate.innerHTML.split(' ')[0] === el.innerHTML) {
		currEl = el;
		todayEl = el;
		todayEl.classList.add('my-hover');
	}
});

function onClickToday() {
	month();
	todayEl.classList.add('my-hover');
	todayEl.click();
}
function clearHover() {
	document.querySelectorAll('.daysOfMonth').forEach((el) => {
		el.classList.remove('my-hover');
	});
}

function month() {
	const monthStr = now.locale('tr').format('MMMM');
	const previousMonth = now.clone().subtract(1, 'months').daysInMonth();
	const dayInMonth = now.daysInMonth();
	const startOfMonth = now.clone().startOf('month').format('e');

	let myMonth = '';
	let counter = 1;
	let nextCounter = 1;

	for (let i = 0; i < 6; i++) {
		let myRow = '<tr>';
		for (let j = 0; j < 7; j++) {
			if (i === 0 && startOfMonth > j) {
				myRow += `<td><span class="daysOfPreviousMonth">${
					previousMonth - (startOfMonth - 1) + j
				}</span></td>`;
			} else if (dayInMonth < counter) {
				myRow += `<td><span class="daysOfNextMonth">${nextCounter}</span></td>`;
				nextCounter++;
			} else {
				myRow += `<td><span class="daysOfMonth" style="color: #000">${counter}</span></td>`;
				counter++;
			}
		}
		myRow += '</tr>';
		myMonth += myRow;
	}

	myTable.innerHTML = myMonth;
	monthName.innerHTML = monthStr;
	myYear.innerHTML = now.format('YYYY');

	document.querySelectorAll('.daysOfMonth').forEach((el) => {
		el.addEventListener('click', (e) => {
			clearHover();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now.add(clickedDay - nowDay, 'days').format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${monthStr}`;
			myDate.classList.add('my-animation');
			setTimeout(() => {
				myDate.classList.remove('my-animation');
			}, 1000);
			wrapper.innerHTML = '';
			counterTask = 0;
			const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(' ', '-'); 
			const messages = doc[key] ? doc[key].message : [];
			messages.forEach((message) => createEl(message));
			currEl = el;
			currEl.classList.add('my-hover');
		})
	});

	document.querySelectorAll('.daysOfPreviousMonth').forEach((el) => {
		el.addEventListener('click', (e) => {
			prev.click();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now.add(clickedDay - nowDay, 'days').format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${now.locale('tr').format('MMMM')}`;
			myDate.classList.add('my-animation');
			setTimeout(() => {
				myDate.classList.remove('my-animation');
			}, 1000);
			wrapper.innerHTML = '';
			const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(' ', '-'); 
			const messages = doc[key] ? doc[key].message : [];
			messages.forEach((message) => createEl(message));
			currEl = el;
		});
	});

	document.querySelectorAll('.daysOfNextMonth').forEach((el) => {
		el.addEventListener('click', (e) => {
			next.click();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now.add(clickedDay - nowDay, 'days').format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${now.locale('tr').format('MMMM')}`;
			myDate.classList.add('my-animation');
			setTimeout(() => {
				myDate.classList.remove('my-animation');
			}, 1000);
			wrapper.innerHTML = '';
			const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(' ', '-'); 
			const messages = doc[key] ? doc[key].message : [];
			messages.forEach((message) => createEl(message));
			currEl = el;
		});
	});
}

const colors = [
	'#b28c66',
	'#b26666',
	'#66b28c',
	'#668cb2',
	'#b266b2',
	'#b2b266',
	'#66B2B2',
	'#313131',
	'#6666b2',
	'#B2668C',
	'#8CB266',
	'#99b2cc',
	'#557fa9',
];

const input = document.querySelector('input');

input.addEventListener('keydown', (e) => {
	if (e.key == 'Enter') {
		createEl();
	}
});

let id = 1;


document.querySelector('#card-0').addEventListener('click', () => {
	document.querySelector('#card-0 .card-body').classList.toggle('d-none');
});

const createEl = (value = '') => {
	if (input.value.trim().length === 0 && value.length === 0) {
		input.value = '';
		return;
	}

	if (value.length !== 0) {
		input.value = value;
	}
	
	const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(' ', '-'); 

	if (value.length === 0 && doc[key]?.message.includes(input.value)) {
		input.value = '';
		return;
	}

	const el = `
		<div id=${`card-${id}`} class="top-to-center card text-white bg-primary mb-3" style='user-select: none; background-color: ${
		colors[Math.floor(Math.random() * colors.length)]
	} !important;'>
            <div
                class="card-header d-flex justify-content-between align-items-center"
            >
                <span>Not ${(counterTask++) + 1}</span>
                <span class="btn">
					<i class="fas fa-trash delete" style="margin-right: .5rem"></i>
                    <i class="fas fa-chevron-down expand"></i>
                </span>
            </div>
            <div class="card-body d-none">
                <p class="card-text">
                    ${input.value}
                </p>
            </div>
        </div>
    `;

	wrapper.insertAdjacentHTML('beforeend', el);

	
	if (value.length === 0) {
		doc[key] = {
			message: [...(doc[key] ? doc[key].message : []), input.value],
		};
	}

	input.value = '';

	const card = document.querySelector(`#card-${id}`);
	const cardExpand = document.querySelector(`#card-${id} .expand`);
	const cardDelete = document.querySelector(`#card-${id} .delete`);
	const cardText = document.querySelector(`#card-${id} .card-text`);

	cardExpand.addEventListener('click', () => {
		document
			.querySelector(
				`#card-${+card.getAttribute('id').split('-')[1]} .card-body`,
			)
			.classList.toggle('d-none');
	});
	
	cardDelete.addEventListener('click', () => {
		doc[key] = { message: [...doc[key].message.filter((d) => d !== cardText.innerHTML.replaceAll('\n', '').trim())]}
		currEl.click();
	});

	id++;
};
