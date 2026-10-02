(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // Phrase -> emoji dictionary. Longer phrases are matched before shorter
  // ones so "thank you" wins over "you", etc.
  // ---------------------------------------------------------------------
  var DICTIONARY = {
    'thank you': '🙏',
    'thanks': '🙏',
    'good morning': '☀️🌅',
    'good night': '🌙😴',
    'good evening': '🌆',
    'i love you': '❤️',
    'i love': '😍',
    'love': '❤️',
    'happy birthday': '🎉🎂',
    'congratulations': '🎉👏',
    'see you later': '👋⏰',
    'see you': '👋',
    'good luck': '🤞',
    'i am sorry': '😔',
    'sorry': '😔',
    'i am happy': '😄',
    'i am sad': '😢',
    'i am tired': '😴',
    'i am hungry': '😋🍽️',
    'i am angry': '😠',
    'i am scared': '😱',
    'hello': '👋',
    'hi': '👋',
    'hey': '👋',
    'goodbye': '👋',
    'bye': '👋',
    'please': '🙏',
    'yes': '✅',
    'no': '❌',
    'maybe': '🤔',
    'ok': '👌',
    'okay': '👌',
    'cool': '😎',
    'awesome': '🤩',
    'amazing': '🤩',
    'great': '👍',
    'nice': '😊',
    'wow': '😲',
    'lol': '😂',
    'haha': '😂',
    'funny': '😂',
    'congrats': '🎉',
    'birthday': '🎂',
    'party': '🎉',
    'music': '🎵',
    'song': '🎵',
    'dance': '💃',
    'movie': '🎬',
    'game': '🎮',
    'book': '📖',
    'read': '📖',
    'write': '✍️',
    'work': '💼',
    'school': '🏫',
    'study': '📚',
    'sleep': '😴',
    'tired': '😴',
    'eat': '🍽️',
    'food': '🍔',
    'hungry': '🍽️',
    'pizza': '🍕',
    'burger': '🍔',
    'coffee': '☕',
    'tea': '🍵',
    'beer': '🍺',
    'wine': '🍷',
    'cake': '🎂',
    'ice cream': '🍦',
    'fruit': '🍎',
    'apple': '🍎',
    'banana': '🍌',
    'water': '💧',
    'rain': '🌧️',
    'snow': '❄️',
    'sun': '☀️',
    'sunny': '☀️',
    'cloud': '☁️',
    'star': '⭐',
    'moon': '🌙',
    'sky': '🌤️',
    'fire': '🔥',
    'hot': '🔥',
    'cold': '🥶',
    'earth': '🌍',
    'world': '🌍',
    'travel': '✈️',
    'fly': '✈️',
    'car': '🚗',
    'drive': '🚗',
    'bike': '🚲',
    'walk': '🚶',
    'run': '🏃',
    'running': '🏃',
    'swim': '🏊',
    'home': '🏠',
    'house': '🏠',
    'city': '🏙️',
    'beach': '🏖️',
    'mountain': '⛰️',
    'tree': '🌳',
    'flower': '🌸',
    'dog': '🐶',
    'cat': '🐱',
    'bird': '🐦',
    'fish': '🐟',
    'love you': '❤️',
    'heart': '❤️',
    'kiss': '😘',
    'hug': '🤗',
    'friend': '🧑‍🤝‍🧑',
    'friends': '🧑‍🤝‍🧑',
    'family': '👨‍👩‍👧‍👦',
    'baby': '👶',
    'kid': '🧒',
    'man': '👨',
    'woman': '👩',
    'king': '🤴',
    'queen': '👸',
    'money': '💰',
    'rich': '🤑',
    'time': '⏰',
    'clock': '⏰',
    'phone': '📱',
    'call': '📞',
    'email': '📧',
    'computer': '💻',
    'internet': '🌐',
    'idea': '💡',
    'think': '🤔',
    'thinking': '🤔',
    'question': '❓',
    'answer': '❗',
    'important': '❗',
    'warning': '⚠️',
    'danger': '⚠️',
    'stop': '🛑',
    'go': '🟢',
    'win': '🏆',
    'winner': '🏆',
    'lose': '😞',
    'fight': '🥊',
    'peace': '✌️',
    'smile': '😊',
    'happy': '😄',
    'sad': '😢',
    'angry': '😠',
    'scared': '😱',
    'surprised': '😲',
    'crying': '😭',
    'cry': '😭',
    'laugh': '😂',
    'laughing': '😂',
    'cute': '🥰',
    'beautiful': '😍',
    'ugly': '🤢',
    'sick': '🤒',
    'doctor': '👨‍⚕️',
    'hospital': '🏥',
    'medicine': '💊',
    'rocket': '🚀',
    'space': '🌌',
    'alien': '👽',
    'robot': '🤖',
    'ghost': '👻',
    'monster': '👹',
    'skull': '💀',
    'devil': '😈',
    'angel': '😇',
    'christmas': '🎄',
    'halloween': '🎃',
    'gift': '🎁',
    'present': '🎁',
    'balloon': '🎈',
    'camera': '📷',
    'picture': '📷',
    'photo': '📷',
    'video': '🎥',
    'tv': '📺',
    'radio': '📻',
    'light': '💡',
    'dark': '🌑',
    'key': '🔑',
    'lock': '🔒',
    'unlock': '🔓',
    'search': '🔍',
    'find': '🔍',
    'new': '🆕',
    'free': '🆓',
    'up': '⬆️',
    'down': '⬇️',
    'left': '⬅️',
    'right': '➡️'
  };

  // Pre-sort dictionary keys by word count (desc) then length (desc) so
  // multi-word phrases are always attempted before single words.
  var SORTED_KEYS = Object.keys(DICTIONARY).sort(function (a, b) {
    var wordsA = a.split(' ').length;
    var wordsB = b.split(' ').length;
    if (wordsB !== wordsA) return wordsB - wordsA;
    return b.length - a.length;
  });

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  var PATTERN = new RegExp(
    '\\b(' + SORTED_KEYS.map(escapeRegExp).join('|') + ')\\b',
    'gi'
  );

  function translateToEmoji(text) {
    if (!text) return '';
    return text.replace(PATTERN, function (match) {
      return DICTIONARY[match.toLowerCase()] || match;
    });
  }

  // ---------------------------------------------------------------------
  // localStorage helpers
  // ---------------------------------------------------------------------
  var RECENT_KEY = 'emojiTranslator_recent';
  var FAVORITES_KEY = 'emojiTranslator_favorites';
  var MAX_RECENT = 15;

  function loadList(key) {
    try {
      var raw = localStorage.getItem(key);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveList(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
      // localStorage unavailable or full - fail silently, app still works
    }
  }

  // ---------------------------------------------------------------------
  // DOM references
  // ---------------------------------------------------------------------
  var textInput = document.getElementById('text-input');
  var resultDisplay = document.getElementById('result-display');
  var saveBtn = document.getElementById('save-btn');
  var recentList = document.getElementById('recent-list');
  var favoritesList = document.getElementById('favorites-list');
  var tabRecent = document.getElementById('tab-recent');
  var tabFavorites = document.getElementById('tab-favorites');
  var emptyMsg = document.getElementById('empty-msg');

  var currentTranslation = '';
  var historyDebounceTimer = null;

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------
  function renderResult(text) {
    currentTranslation = translateToEmoji(text);
    if (!text || !text.trim()) {
      resultDisplay.innerHTML = '';
      var placeholder = document.createElement('span');
      placeholder.className = 'placeholder';
      placeholder.textContent = 'Your emoji translation will appear here ✨';
      resultDisplay.appendChild(placeholder);
      saveBtn.disabled = true;
      return;
    }
    resultDisplay.textContent = currentTranslation;
    saveBtn.disabled = false;
  }

  function createListItem(entry, listType) {
    var li = document.createElement('li');
    li.className = 'list-item';

    var textSpan = document.createElement('button');
    textSpan.type = 'button';
    textSpan.className = 'list-item-text';
    textSpan.setAttribute('aria-label', 'Load this translation back into the input');
    var original = document.createElement('span');
    original.className = 'original';
    original.textContent = entry.text;
    var emoji = document.createElement('span');
    emoji.className = 'emoji-result';
    emoji.textContent = entry.emoji;
    textSpan.appendChild(original);
    textSpan.appendChild(emoji);
    textSpan.addEventListener('click', function () {
      textInput.value = entry.text;
      renderResult(entry.text);
      textInput.focus();
    });

    var actions = document.createElement('div');
    actions.className = 'list-item-actions';

    if (listType === 'recent') {
      var favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'icon-btn';
      favBtn.title = 'Save to favorites';
      favBtn.setAttribute('aria-label', 'Save to favorites');
      favBtn.textContent = '⭐';
      favBtn.addEventListener('click', function () {
        addFavorite(entry.text, entry.emoji);
      });
      actions.appendChild(favBtn);
    }

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'icon-btn';
    removeBtn.title = 'Remove';
    removeBtn.setAttribute('aria-label', 'Remove entry');
    removeBtn.textContent = '🗑️';
    removeBtn.addEventListener('click', function () {
      if (listType === 'recent') {
        removeRecent(entry.id);
      } else {
        removeFavorite(entry.id);
      }
    });
    actions.appendChild(removeBtn);

    li.appendChild(textSpan);
    li.appendChild(actions);
    return li;
  }

  function renderLists() {
    var recent = loadList(RECENT_KEY);
    var favorites = loadList(FAVORITES_KEY);

    recentList.innerHTML = '';
    recent.forEach(function (entry) {
      recentList.appendChild(createListItem(entry, 'recent'));
    });

    favoritesList.innerHTML = '';
    favorites.forEach(function (entry) {
      favoritesList.appendChild(createListItem(entry, 'favorites'));
    });

    var activeIsRecent = !tabFavorites.classList.contains('active');
    var activeList = activeIsRecent ? recent : favorites;
    emptyMsg.classList.toggle('hidden', activeList.length > 0);
  }

  // ---------------------------------------------------------------------
  // History / favorites mutation
  // ---------------------------------------------------------------------
  function addRecent(text, emoji) {
    if (!text || !text.trim()) return;
    var list = loadList(RECENT_KEY);
    // Avoid duplicate consecutive entries
    if (list.length && list[0].text === text) return;
    list.unshift({ id: Date.now() + '-' + Math.random().toString(36).slice(2), text: text, emoji: emoji });
    if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
    saveList(RECENT_KEY, list);
    renderLists();
  }

  function removeRecent(id) {
    var list = loadList(RECENT_KEY).filter(function (e) { return e.id !== id; });
    saveList(RECENT_KEY, list);
    renderLists();
  }

  function addFavorite(text, emoji) {
    if (!text || !text.trim()) return;
    var list = loadList(FAVORITES_KEY);
    var exists = list.some(function (e) { return e.text === text; });
    if (exists) return;
    list.unshift({ id: Date.now() + '-' + Math.random().toString(36).slice(2), text: text, emoji: emoji });
    saveList(FAVORITES_KEY, list);
    renderLists();
  }

  function removeFavorite(id) {
    var list = loadList(FAVORITES_KEY).filter(function (e) { return e.id !== id; });
    saveList(FAVORITES_KEY, list);
    renderLists();
  }

  // ---------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------
  textInput.addEventListener('input', function () {
    var text = textInput.value;
    renderResult(text);

    clearTimeout(historyDebounceTimer);
    historyDebounceTimer = setTimeout(function () {
      addRecent(text, currentTranslation);
    }, 1200);
  });

  saveBtn.addEventListener('click', function () {
    var text = textInput.value;
    if (!text.trim()) return;
    addFavorite(text, currentTranslation);
    addRecent(text, currentTranslation);
  });

  tabRecent.addEventListener('click', function () {
    tabRecent.classList.add('active');
    tabFavorites.classList.remove('active');
    tabRecent.setAttribute('aria-selected', 'true');
    tabFavorites.setAttribute('aria-selected', 'false');
    recentList.classList.remove('hidden');
    favoritesList.classList.add('hidden');
    renderLists();
  });

  tabFavorites.addEventListener('click', function () {
    tabFavorites.classList.add('active');
    tabRecent.classList.remove('active');
    tabFavorites.setAttribute('aria-selected', 'true');
    tabRecent.setAttribute('aria-selected', 'false');
    favoritesList.classList.remove('hidden');
    recentList.classList.add('hidden');
    renderLists();
  });

  // ---------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------
  renderResult('');
  renderLists();
})();
