/* ============================================
   CINC Connect Demo — Pets State
   Persists pet registrations in localStorage
   under cinc:demo:pets
   ============================================ */

(function () {
  'use strict';

  const KEY_PETS = 'cinc:demo:pets';

  // Dropdown values that match Jessica's spec
  const UNIT_NUMBERS = [
    '12346 Washington Ave',
    '13490 Avenue 58',
    '12 Trees 20 43',
    '1 APT22'
  ];

  const DESIGNATIONS = [
    { value: 'pet', label: 'Pet' },
    { value: 'service-animal', label: 'Service Animal' },
    { value: 'emotional-support', label: 'Emotional Support Animal' },
    { value: 'other', label: 'Other' }
  ];

  const TYPES = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' }
  ];

  const BREEDS_BY_TYPE = {
    dog: ['Dalmatian', 'Pug', 'Golden Retriever', 'Australian Shepherd'],
    cat: ['Esmerelda Calico', 'Sunshine Tabby']
  };

  function getPets() {
    try { return JSON.parse(localStorage.getItem(KEY_PETS) || '[]'); }
    catch (_) { return []; }
  }

  function savePets(arr) {
    localStorage.setItem(KEY_PETS, JSON.stringify(arr));
  }

  function addPet(pet) {
    const all = getPets();
    all.unshift(pet);
    savePets(all);
    return pet;
  }

  function updatePet(id, patch) {
    const all = getPets();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    all[idx] = Object.assign({}, all[idx], patch);
    savePets(all);
    return all[idx];
  }

  function deletePet(id) {
    const all = getPets().filter((p) => p.id !== id);
    savePets(all);
  }

  function newPetId() {
    return 'pet-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  }

  function designationLabel(value) {
    const d = DESIGNATIONS.find((x) => x.value === value);
    return d ? d.label : value;
  }

  function typeLabel(value) {
    const t = TYPES.find((x) => x.value === value);
    return t ? t.label : value;
  }

  window.PetsState = {
    UNIT_NUMBERS, DESIGNATIONS, TYPES, BREEDS_BY_TYPE,
    getPets, addPet, updatePet, deletePet, newPetId,
    designationLabel, typeLabel
  };
})();
