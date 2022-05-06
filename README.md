custom select with float label

usage:

1.include js to your template.
2.add component and slots inside them
    <custom-select-with-float-label>
      <span class="label" slot="Your favorite spell"></span>
      <span class="inputname" slot="selectedSpell"></span>
      <span class="item" slot="Expecto Patronum"></span>
      <span class="item" slot="Avada Kedavra"></span>
      <span class="item" slot="Wingardium Leviosa"></span>
    </custom-select-with-float-label>

3.edit/add values in slots to continue usage