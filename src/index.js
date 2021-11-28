panel.plugin('rasteiner/oh-hi-mark', { use: [
  function(Vue) {
    //only start when custom marks are set up
    const marks = panel.plugins.thirdParty.marks;
    if(!(marks)) return;

    const original = Vue.component('k-writer');

    Vue.component('k-writer', {
      extends: original,
      methods: {
        createMarks() {
          let originalMarks = original.options.methods.createMarks.call(this);

          if(!originalMarks) return [];
          if(!originalMarks.length) {
            console.warn("Could not add custom marks to writer instance. At least one original mark has to be enabled.");
            return originalMarks;
          }

          const markProto = Object.getPrototypeOf(
              Object.getPrototypeOf(originalMarks[0])
            );

          for (const [name, mark] of Object.entries(marks)) {
            originalMarks = originalMarks.filter(m => m.name !== name);
            Object.setPrototypeOf(mark, markProto);
          }

          return [
            ...originalMarks || [],
            ...this.filterExtensions(marks, this.marks) || [],
          ];
        }
      }
    });
  }
]});
