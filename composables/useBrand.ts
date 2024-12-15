import { ref } from 'vue';
import { toast } from 'vue3-toastify';

interface BrandData {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export const useBrand = () => {
  const brand = ref<BrandData | null>(null);
  const loading = ref(false);
  const error = ref('');

  const fetchBrand = async () => {
    loading.value = true;
    try {
      const response = await $fetch<BrandData>('/api/brand');
      brand.value = response;
    } catch (err) {
      error.value = 'Erreur lors du chargement des informations de la marque';
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const updateBrand = async (data: Partial<BrandData>) => {
    loading.value = true;
    try {
      const response = await $fetch<BrandData>('/api/brand', {
        method: 'PUT',
        body: data
      });
      brand.value = response;
      toast.success('Informations de la marque mises à jour');
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour';
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  return {
    brand,
    loading,
    error,
    fetchBrand,
    updateBrand
  };
};