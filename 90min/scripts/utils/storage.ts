import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Storage {

    async listContent() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const items = await AsyncStorage.multiGet(keys);
            return items.map(([key, value]) => ({ key, value: value ? JSON.parse(value) : null }));
        } catch (error) {
            console.error("Erro ao listar conteúdo: ", error);
            return [];
        }
    }

    async getContent(index: string) {
        try {
            const value = await AsyncStorage.getItem(index);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Erro ao obter item ${index}:`, error);
            return null;
        }
    }

    async getKeys() {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.error("Erro ao buscar chaves:", error);
            return [];
        }
    }

    async saveContent(index: string, content: any) {
        try {
            console.log(`✅ Dados salvos em "${index}"`);
            return await AsyncStorage.setItem(index, JSON.stringify(content));
        } catch (error) {
            console.error(`Erro ao salvar conteúdo em ${index}:`, error);
        }

    }

    async deleteContent(index: string) {
        try {
            await AsyncStorage.removeItem(index);
            console.log(`🗑️ Item "${index}" removido`);
        } catch (error) {
            console.error(`Erro ao deletar item ${index}:`, error);
        }
    }

    async clearContent() {
        try {
            await AsyncStorage.clear();
            console.log("🧹 Todo o conteúdo foi limpo do AsyncStorage");
        } catch (error) {
            console.error("Erro ao limpar conteúdo:", error);
        }
    }
}