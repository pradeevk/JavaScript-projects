document.addEventListener('DOMContentLoaded', () => {
  const eventList = document.getElementById('event-list');
  const searchInput = document.getElementById('search');
  const addForm = document.getElementById('add-form');
  const message = document.getElementById('message');
  const sortSelect = document.getElementById('sort');

  async function loadEvents(searchTerm = '', sortBy = '') {
    let url = '/api/events';
    if (searchTerm) {
      url = `/api/events/search?name=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(searchTerm)}`;
    }
    const res = await fetch(url);
    let events = await res.json();


    if (sortBy === 'eventName') {
      events.sort((a, b) => b.eventName.localeCompare(a.eventName));
    } else if (sortBy === 'location') {
      events.sort((a, b) => b.location.localeCompare(a.location));
    }

    eventList.innerHTML = '';
    if (events.length === 0) {
      eventList.innerHTML = '<li class="p-4">No events found.</li>';
      return;
    }
    events.forEach(event => {
      const li = document.createElement('li');
      li.className = 'p-4 border-b';
      li.innerHTML = `
        <strong>${event.eventName}</strong><br>
        Date: ${event.date} | Location: ${event.location} | Cost: ₹${event.cost}
      `;
      eventList.appendChild(li);
    });
  }

 
  loadEvents();


  searchInput.addEventListener('input', () => {
    loadEvents(searchInput.value, sortSelect.value);
  });

  sortSelect.addEventListener('change', () => {
    loadEvents(searchInput.value, sortSelect.value);
  });

  document.getElementById('clearBtn').addEventListener('click', async () => {
  if (confirm("Are you sure you want to delete all events?")) {
    const res = await fetch('/api/events', { method: 'DELETE' });
    const data = await res.json();
    document.getElementById('message').textContent = data.message;
    fetchEvents();
  }
});

  addForm.addEventListener('submit', async e => {
    e.preventDefault();

    const eventName = addForm.eventName.value.trim();
    const date = addForm.date.value;
    const location = addForm.location.value.trim();
    const cost = addForm.cost.value;

    if (!eventName || !date || !location || !cost) {
      message.textContent = 'Please fill all fields.';
      message.style.color = 'red';
      return;
    }

    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, date, location, cost })
    });

    if (res.ok) {
      message.textContent = '✅ Event added successfully!';
      message.style.color = 'green';
      addForm.reset();
      loadEvents(searchInput.value, sortSelect.value);
    } else {
      message.textContent = '❌ Failed to add event.';
      message.style.color = 'red';
    }

    setTimeout(() => {
      message.textContent = '';
    }, 3000);
  });
});
