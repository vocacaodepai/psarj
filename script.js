(function () {
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Horários provisórios (0 = domingo). Substituir pelos oficiais.
  var SCHEDULE = {
    0: ['08:00', '10:00', '12:00', '19:00'],
    1: ['07:00', '19:00'], 2: ['07:00', '19:00'], 3: ['07:00', '19:00'],
    4: ['07:00', '19:00'], 5: ['07:00', '19:00'],
    6: ['07:00', '18:00']
  };
  var DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

  var now = new Date();
  var today = now.getDay();
  document.querySelectorAll('.card[data-days]').forEach(function (c) {
    if (c.dataset.days.split(',').indexOf(String(today)) > -1) c.classList.add('today');
  });

  var out = document.getElementById('nm-when');
  for (var i = 0; i < 8 && out; i++) {
    var d = (today + i) % 7;
    var times = SCHEDULE[d] || [];
    for (var j = 0; j < times.length; j++) {
      var p = times[j].split(':');
      var t = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, +p[0], +p[1]);
      if (t > now) {
        var label = i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : DIAS[d];
        out.textContent = label + ', ' + times[j].replace(':', 'h');
        i = 99; break;
      }
    }
  }

  var copy = document.getElementById('copy-pix');
  copy.addEventListener('click', function () {
    var key = document.getElementById('pix-key').textContent;
    var done = function () { copy.textContent = 'Chave copiada ✓'; setTimeout(function () { copy.textContent = 'Copiar chave'; }, 2000); };
    if (navigator.clipboard) navigator.clipboard.writeText(key).then(done, done); else done();
  });
})();
