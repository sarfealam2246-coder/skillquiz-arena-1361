try {
window.onAppReady = async function() {
    const user = FactoryDB.getUserSync();
    if (user) {
        const { points, rank } = user;
        document.getElementById('header-badge').innerText = `Points: ${points} | Rank: ${rank}`;
        
        const dailyChallengeBanner = document.createElement('div');
        dailyChallengeBanner.className = 'bg-emerald-500 text-white p-4 rounded-lg text-center';
        dailyChallengeBanner.innerText = 'Join the Daily Challenge!';
        document.getElementById('view-1').appendChild(dailyChallengeBanner);

        const categories = ['Tech', 'Cricket', 'GK', 'Math'];
        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'bg-gradient-to-r from-blue-500 to-violet-500 text-white p-4 m-2 rounded-lg cursor-pointer shadow-lg hover:scale-105 transition-transform';
            card.innerText = category;
            card.onclick = () => {
                const quizHtml = `<div>Quiz for ${category} with timer and questions...</div>`;
                FactoryNav.openDetail(category, quizHtml);
            };
            document.getElementById('view-1').appendChild(card);
        });

        FactoryUI.refreshIcons();
    }
};

window.onTabChange = function(tabNum) {
    const views = ['view-1', 'view-2', 'view-3', 'view-4'];
    views.forEach((view, index) => {
        document.getElementById(view).style.display = index === tabNum ? 'block' : 'none';
    });
};

window.onSearchInput = function(query) {
    const items = FactoryDB.getItems('quiz_note');
    const filteredItems = items.filter(item => item.title.includes(query));
    // Update the UI with filteredItems
};

window.onFloatingAction = function() {
    const modalContent = `
        <div>
            <h2>Add Custom Question</h2>
            <input type="text" id="question-title" placeholder="Question Title" />
            <textarea id="question-data" placeholder="Question Data"></textarea>
            <button id="save-question">Save Question</button>
            <button id="claim-points">Claim Daily Check-in +50 Points</button>
        </div>
    `;
    FactoryUI.modal(modalContent);
    
    document.getElementById('save-question').onclick = function() {
        const title = document.getElementById('question-title').value;
        const data = document.getElementById('question-data').value;
        FactoryDB.saveItem('quiz_note', title, data);
    };

    document.getElementById('claim-points').onclick = function() {
        const user = FactoryDB.getUserSync();
        if (user) {
            FactoryDB.recordTx('Daily Check-in', 'checkin', 50, 0, 0, 0);
            FactoryUI.toast('Claimed +50 Points!');
        }
    };
};
} catch (sfErr) { console.error("AppJS Error:", sfErr); if (window.FactoryNav) window.FactoryNav.ensureNonBlank(); }