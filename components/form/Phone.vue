<template>
  <div>
    <!-- Sélecteur de pays avec le countryCode par défaut -->
    <select v-model="selectedCountryCode" @change="onCountryCodeChange">
      <option
        v-for="country in countryCodes"
        :key="country.code"
        :value="country.code"
      >
        {{ country.name }} ({{ country.code }})
      </option>
    </select>

    <!-- Champ de téléphone -->
    <ProximaPhone
      v-model="phoneNumber"
      :countryCode="selectedCountryCode"
      :format="`${props.selectedCountryCode} ** ** ** ** **`"
      validity-status="both"
      mask-char=" "
      @input="onPhoneNumberChange"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import ProximaPhone, { getRawPhone } from "proxima-vue/field/phone";

// Liste des codes pays disponibles
const countryCodes = [
  { code: "+225", name: "Côte d’Ivoire" },
  { code: "+33", name: "France" },
  { code: "+1", name: "États-Unis" },
  { code: "+44", name: "Royaume-Uni" },
  { code: "+237", name: "Cameroun" },
  { code: "+227", name: "Burkina Faso" },
  { code: "+226", name: "Bénin" },
];

// Définition des props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  selectedCountryCode: {
    type: String,
    default: "+225", // Par défaut, le pays est la Côte d’Ivoire (+225)
  },
});

// Émissions d'événements
const emit = defineEmits([
  "update:modelValue",
  "update:selectedCountryCode",
  "raw-phone",
]);

// État local
const phoneNumber = ref(props.modelValue || ""); // Utilisation du modèle si fourni

// Sélection du countryCode par défaut
let selectedCountryCode = ref(props.selectedCountryCode);

// Met à jour le numéro complet brut
const updateRawPhone = () => {
  const rawPhone = getRawPhone(
    `${selectedCountryCode.value}${phoneNumber.value}`
  );
  emit("raw-phone", rawPhone); // Émet le numéro brut sans caractères supplémentaires
};

// Met à jour le countryCode
const onCountryCodeChange = (event) => {
  selectedCountryCode.value = event.target.value;
  emit("update:selectedCountryCode", selectedCountryCode.value); // Émet le changement du code pays
};

// Met à jour le numéro de téléphone
const onPhoneNumberChange = (value) => {
  phoneNumber.value = value;
  emit("update:modelValue", value); // Met à jour le modèle de téléphone
};

// Surveille les changements pour générer le numéro brut
watch(
  [() => phoneNumber.value, () => selectedCountryCode.value],
  updateRawPhone
);
</script>

<style scoped>
/* Style du select et du champ de téléphone */
select {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
}

.proxima-phone-input {
  width: 100%;
  padding: 0.5rem;
}
</style>
