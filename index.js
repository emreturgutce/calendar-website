let now = moment();
let currEl; // Seçili günü tutar
let todayEl; // Bugünü tutar
let counterTask = 0; // Notlara sırayla numara verilmesi için kullanılan değişken
let id = 1; // Notların id'si

const days = [1, 2, 3, 4, 5, 6, 0];
/* Not kartlarının renkleri */
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
const input = document.querySelector('.text-input');
const nav = document.querySelector('.navigation__button');
const monthStrg = now.locale('tr').format('MMMM');
const dayNumberStr = now.locale('tr').format('DD');
const dayStr = now.locale('tr').format('dddd');
const notes = {};

// Başlangıçta bugünün tarihini yazdır
myDateDay.innerHTML = dayStr;
myDateDate.innerHTML = `${dayNumberStr} ${monthStrg}`;

/*
 * Not kartını oluşturan ve notlar alanına ekleyen fonksiyon.
 */
const createEl = (value = '') => {
	// Girilen input'un istediğimiz formatta olduğundan emin oluyoruz.
	if (input.value.trim().length === 0 && value.length === 0) {
		input.value = '';
		return;
	}

	if (value.length !== 0) {
		input.value = value;
	}

	const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(
		' ',
		'-',
	);

	// Girilen input'un aynısı önceden girilen notlar içerisinde bulunuyor mu
	if (value.length === 0 && notes[key]?.message.includes(input.value)) {
		input.value = '';
		return;
	}

	// Not kartı elementini oluşturuyoruz
	const el = `
		<div id=${`card-${id}`} class="top-to-center card text-white bg-primary mb-3" style='user-select: none; background-color: ${
		colors[Math.floor(Math.random() * colors.length)]
	} !important;'>
            <div
                class="card-header d-flex justify-content-between align-items-center"
            >
                <span>Not ${counterTask++ + 1}</span>
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

	// Oluşturduğumuz kartı notlar alanı içerisine ekliyoruz
	wrapper.insertAdjacentHTML('beforeend', el);

	if (value.length === 0) {
		notes[key] = {
			message: [...(notes[key] ? notes[key].message : []), input.value],
		};
	}

	// İnput alanını sıfırlıyoruz
	input.value = '';

	// Kart içerisinde bulunan silme ve genişletme butonlarına gerekli event listener'ları ekliyoruz
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
		// Silme butonuna tıklandığında notu notlar listesinden çıkar
		notes[key] = {
			message: [
				...notes[key].message.filter(
					(d) => d !== cardText.innerHTML.replaceAll('\n', '').trim(),
				),
			],
		};
		currEl.click();
	});

	id++;
};

/* Bir önceki aya gitmek istediğinde kullanıcının tıkladığı buton */
prev.addEventListener('click', () => {
	// now değişkeni içerisine bir önceki ayı atıyoruz
	now = now.clone().subtract(1, 'month');
	// Takvimi yeniliyoruz
	month();
	// animasyon class'ını takvime ekliyoruz
	table.classList.add('left-to-center');
	// animasyon class'ını kaldırıyoruz
	setTimeout(() => {
		table.classList.remove('left-to-center');
	}, 500);
});

/* Bir sonraki aya gitmek istediğinde kullanıcının tıkladığı buton */
next.addEventListener('click', () => {
	// now değişkeni içerisine bir sonraki ayı atıyoruz
	now = now.clone().add(1, 'month');
	// Takvimi yeniliyoruz
	month();
	// animasyon class'ını takvime ekliyoruz
	table.classList.add('right-to-center');
	// animasyon class'ını kaldırıyoruz
	setTimeout(() => {
		table.classList.remove('right-to-center');
	}, 500);
});

/* Input üzerinde "enter" tuşuna basıldığında kart oluşturma fonksiyonunu çağırır. */
input.addEventListener('keydown', (e) => {
	if (e.key == 'Enter') {
		createEl();
	}
});

/* Sayfa ilk yüklendiğinde takvimdeki bugün tarihi üzerinde hover efekti oluşturur */
document.querySelectorAll('.daysOfMonth').forEach((el) => {
	if (myDateDate.innerHTML.split(' ')[0] === el.innerHTML) {
		currEl = el;
		todayEl = el;
		todayEl.classList.add('my-hover');
	}
});

/* Navbar'da herhangi bir linke tıklandıktan sonra navbar'ı kapatır */
document.querySelectorAll('.navigation__link').forEach((val) => {
	val.addEventListener('click', () => {
		nav.click();
	});
});

month();

/* Kullanıcı sağ taraftaki "Bugüne git" butonuna tıkladığında çağırılan fonksiyon */
function onClickToday() {
	// takvimi yeniler
	month();
	// bugüne hover efekti ekler
	todayEl.classList.add('my-hover');
	todayEl.click();
}

/* Takvim üzerinde bulunan günlerin hover stillerini silen fonksiyon */
function clearHover() {
	document.querySelectorAll('.daysOfMonth').forEach((el) => {
		el.classList.remove('my-hover');
	});
}

/* Moment kütüphanesini kullanarak takvimi dolduran fonksiyon */
function month() {
	const monthStr = now.locale('tr').format('MMMM');
	const previousMonth = now.clone().subtract(1, 'months').daysInMonth();
	const dayInMonth = now.daysInMonth();
	const startOfMonth = now.clone().startOf('month').format('e');

	let myMonth = '';
	let counter = 1;
	let nextCounter = 1;

	// Gerekli ayın günlerini tablonun içerisine ekler
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

	// Takvim üzerinden bu ayki herhangi bir güne tıklandığında çağırılan event listener
	document.querySelectorAll('.daysOfMonth').forEach((el) => {
		el.addEventListener('click', (e) => {
			// Butün hover efeklerini kaldır
			clearHover();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			// Tıklanan günü al ve bazı yazıların içeriğini güncelle
			myDateDay.innerHTML = now
				.add(clickedDay - nowDay, 'days')
				.format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${monthStr}`;
			// Opacity animasyonu class'ını ekle
			myDate.classList.add('my-animation');
			// Opacity animasyonu class'ını kaldır
			setTimeout(() => {
				myDate.classList.remove('my-animation');
			}, 1000);
			// Kart alanının içini boşalt
			wrapper.innerHTML = '';
			counterTask = 0;
			const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(
				' ',
				'-',
			);
			const messages = notes[key] ? notes[key].message : [];
			// Kart alanı içerisine seçilen tarihteki notları ekle
			messages.forEach((message) => createEl(message));
			currEl = el;
			// Sadece tıklanan gün üzerine hover efekti ekle
			currEl.classList.add('my-hover');
		});
	});

	// Takvim üzerinden bir önceki ayki herhangi bir güne tıklandığında çağırılan event listener
	document.querySelectorAll('.daysOfPreviousMonth').forEach((el) => {
		el.addEventListener('click', (e) => {
			prev.click();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now
				.add(clickedDay - nowDay, 'days')
				.format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${now
				.locale('tr')
				.format('MMMM')}`;
			myDate.classList.add('my-animation');
			setTimeout(() => {
				myDate.classList.remove('my-animation');
			}, 1000);
			wrapper.innerHTML = '';
			const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(
				' ',
				'-',
			);
			const messages = notes[key] ? notes[key].message : [];
			messages.forEach((message) => createEl(message));
			currEl = el;
		});
	});

	// Takvim üzerinden bir sonraki ayki herhangi bir güne tıklandığında çağırılan event listener
	document.querySelectorAll('.daysOfNextMonth').forEach((el) => {
		el.addEventListener('click', (e) => {
			next.click();
			const clickedDay = +e.target.innerHTML;
			const nowDay = +now.format('DD');

			myDateDay.innerHTML = now
				.add(clickedDay - nowDay, 'days')
				.format('dddd');
			myDateDate.innerHTML = `${e.target.innerHTML} ${now
				.locale('tr')
				.format('MMMM')}`;
			myDate.classList.add('my-animation');
			setTimeout(() => {
				myDate.classList.remove('my-animation');
			}, 1000);
			wrapper.innerHTML = '';
			const key = `${myDateDate.innerHTML} ${myYear.innerHTML}`.replaceAll(
				' ',
				'-',
			);
			const messages = notes[key] ? notes[key].message : [];
			messages.forEach((message) => createEl(message));
			currEl = el;
		});
	});
}
