const colors = [
	'#b28c66',
	'#b26666',
	'#316931',
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

let id = 0;

const wrapper = document.querySelector('.card-wrapper');

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
