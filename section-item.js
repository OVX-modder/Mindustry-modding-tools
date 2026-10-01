document.getElementById('main').insertAdjacentHTML('beforeend', `
<div id="section-item" class="section">
  <h2>Add Item</h2>
  <h3>Basic Info</h3>
  <label>Internal Name</label>
  <input type="text" id="itemName" placeholder="my-item">
  <label>Display Name</label>
  <input type="text" id="itemDisplayName" placeholder="My Item">
  <label>Description</label>
  <textarea id="itemDescription" placeholder="A cool item..."></textarea>
  <h3>Visuals</h3>
  <label>Color</label>
  <input type="text" id="itemColor" value="ff0000ff">
  <h3>Stats</h3>
  <label>Hardness (0-10)</label>
  <input type="number" id="itemHardness" value="2">
  <label>Cost</label>
  <input type="number" id="itemCost" value="1">
  <label>Flammability (0-1)</label>
  <input type="number" id="itemFlammability" value="0" step="0.1">
  <label>Explosiveness (0-1)</label>
  <input type="number" id="itemExplosiveness" value="0" step="0.1">
  <label>Radioactivity (0-1)</label>
  <input type="number" id="itemRadioactivity" value="0" step="0.1">
  <label>Charge (0-1)</label>
  <input type="number" id="itemCharge" value="0" step="0.1">
  <h3>Visibility</h3>
  <label>Shown in build menu?</label>
  <select id="itemBuildable">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <label>Hidden from UI?</label>
  <select id="itemHidden">
    <option value="true">Yes (true)</option>
    <option value="false" selected>No (false)</option>
  </select>
  <label>Always unlocked?</label>
  <select id="itemAlwaysUnlocked">
    <option value="true" selected>Yes (true)</option>
    <option value="false">No (false)</option>
  </select>
  <h3>Sprite</h3>
  <label>Sprite</label>
  <select id="itemSpriteChoice">
    <option value="random">Generate one for me</option>
    <option value="upload">Upload my own</option>
  </select>
  <input type="file" id="itemSpriteFile" accept="image/png" style="display:none">
</div>
`);