panel.plugin('rasteiner/oh-hi-mark', { use: [
  function(Vue) {
    //only start when custom marks are set up
    const customMarks = panel.plugins.thirdParty.marks;
    if(!(customMarks)) return;

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

          const marks = {};

          for (const [name, mark] of Object.entries(customMarks)) {
            marks[name] = Object.create(markProto, Object.getOwnPropertyDescriptors(mark));
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
