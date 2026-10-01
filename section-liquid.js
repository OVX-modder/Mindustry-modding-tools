document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-liquid" class="section">
  <h2>Add Liquid</h2>
  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="liquidName" placeholder="my-liquid">
  <label>Display Name</label>
  <input type="text" id="liquidDisplayName" placeholder="My Liquid">
  <label>Description</label>
  <textarea id="liquidDescription" placeholder="A cool liquid..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="liquidColor" value="0000ffff">
  <label>Gas Color</label>
  <input type="text" id="liquidGasColor" value="ffffff00">
  <label>Bar Color</label>
  <input type="text" id="liquidBarColor" value="0000ffff">
  <label>Light Color</label>
  <input type="text" id="liquidLightColor" value="00000000">
  <h3>Physical Properties</h3>
  <label>Is Gas?</label>
  <select id="liquidGas">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Temperature (0-1)</label>
  <input type="number" id="liquidTemperature" value="0.5" step="0.1">
  <label>Heat Capacity</label>
  <input type="number" id="liquidHeatCapacity" value="0.4" step="0.1">
  <label>Viscosity (0.5-1)</label>
  <input type="number" id="liquidViscosity" value="0.5" step="0.1">
  <label>Flammability (0-1)</label>
  <input type="number" id="liquidFlammability" value="0" step="0.1">
  <label>Explosiveness (0-1)</label>
  <input type="number" id="liquidExplosiveness" value="0" step="0.1">
  <label>Boil Point</label>
  <input type="number" id="liquidBoilPoint" value="1" step="0.1">
  <h3>Behavior</h3>
  <label>Coolant?</label>
  <select id="liquidCoolant">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Block Reactive?</label>
  <select id="liquidBlockReactive">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Move Through Blocks?</label>
  <select id="liquidMoveThroughBlocks">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Incinerable?</label>
  <select id="liquidIncinerable">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Cap Puddles?</label>
  <select id="liquidCapPuddles">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Can Stay On</label>
  <input type="text" id="liquidCanStayOn" placeholder="">
  <h3>Effects (optional)</h3>
  <label>Status Effect</label>
  <input type="text" id="liquidEffect" placeholder="">
  <label>Particle Effect</label>
  <input type="text" id="liquidParticleEffect" placeholder="">
  <label>Particle Spacing</label>
  <input type="number" id="liquidParticleSpacing" value="0.5" step="0.1">
  <h3>Visibility</h3>
  <label>Hidden from UI?</label>
  <select id="liquidHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="liquidSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="liquidSpriteFile" accept="image/png" style="display:none">
</div>
`);