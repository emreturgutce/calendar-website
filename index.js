let now = moment();
const days = [1, 2, 3, 4, 5, 6, 0];

const myTable = document.querySelector('#my-table');
const monthName = document.querySelector('#month-name');
const myDateDay = document.querySelector('.my-date-day');
const myDateDate = document.querySelector('.my-date-date');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const myYear = document.querySelector('.my-year');

const monthStrg = now.locale('tr').format('MMMM');
const dayNumberStr = now.locale('tr').format('DD');
const dayStr = now.locale('tr').format('dddd');

myDateDay.innerHTML = dayStr;
myDateDate.innerHTML = `${dayNumberStr} ${monthStrg}`;

prev.addEventListener('click', () => {
	now = now.clone().subtract(1, 'month');
	month();
});

next.addEventListener('click', () => {
	now = now.clone().add(1, 'month');
	month();
});

month();

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

	document.querySelectorAll('.daysOfMonth').forEach((el) =>
		el.addEventListener('click', (e) => {
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now.add(clickedDay - nowDay, 'days').format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${monthStr}`;
		}),
	);

	document.querySelectorAll('.daysOfPreviousMonth').forEach((el) =>
		el.addEventListener('click', (e) => {
			prev.click();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now.add(clickedDay - nowDay, 'days').format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${now.locale('tr').format('MMMM')}`;
		}),
	);

	document.querySelectorAll('.daysOfNextMonth').forEach((el) =>
		el.addEventListener('click', (e) => {
			next.click();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now.add(clickedDay - nowDay, 'days').format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${now.locale('tr').format('MMMM')}`;
		}),
	);
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

const wrapper = document.querySelector('.card-wrapper');

document.querySelector('#card-0').addEventListener('click', (e) => {
	document.querySelector('#card-0 .card-body').classList.toggle('d-none');
});

const createEl = () => {
	if (input.value.trim().length === 0) {
		input.value = '';
		return;
	}

	const el = `
        <div id=${`card-${id}`} class="card text-white bg-primary mb-3" style='background-color: ${
		colors[Math.floor(Math.random() * colors.length)]
	} !important;'>
            <div
                class="card-header d-flex justify-content-between align-items-center"
            >
                <span>Header</span>
                <span class="btn">
                    <i class="fas fa-chevron-down"></i>
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

	input.value = '';

	const card = document.querySelector(`#card-${id}`);

	card.addEventListener('click', (e) => {
		document
			.querySelector(
				`#card-${+card.getAttribute('id').split('-')[1]} .card-body`,
			)
			.classList.toggle('d-none');
	});

	id++;
};
