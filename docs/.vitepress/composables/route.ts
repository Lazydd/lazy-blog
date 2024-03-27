import { useRoute } from 'vitepress';
import { computed } from 'vue';

export function useRawPath() {
	const route = useRoute();

	return computed(() => decodeURIComponent(route.path).toLowerCase());
}
