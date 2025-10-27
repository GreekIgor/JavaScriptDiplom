class Storage{

    constructor(){
        this.storageData = []
        this.filters = {}
        this.filteredData = []
    }

// Добавить фильтр
setFilter(filter)
{
    this.filters = { ...this.filters, ...filter };
    return this;
}
// Отменить фильтр 
removeFilter(key) {
    const { [key]: _, ...rest } = this.filters;
    this.filters = rest;
    this.applyFilters();
  }
//Удалить все фильтры
clearFilters()
{
    this.filters = {}
    this.filteredData = [...this.storageData];
} 

// Применить все фильтры
  applyFilters() {
    this.filteredData = this.storageData.filter(item => {
      // === 1. Поиск по названию (частичное совпадение, регистронезависимо) ===
      if (this.filters.search) {
        const term = this.filters.search.toLowerCase();
        if (!item.name.toLowerCase().includes(term)) return false;
      }
      // === 2. Фильтр по типу (item.type — массив) ===
      if (this.filters.type && !item.type.includes(this.filters.type)) {
        return false;
      }

      // === 3. Цена (по полю price.new) ===
      if (this.filters.minPrice !== undefined && item.price.new < this.filters.minPrice) {
        return false;
      }
      if (this.filters.maxPrice !== undefined && item.price.new > this.filters.maxPrice) {
        return false;
      }

      // === 4. Наличие в конкретном городе ===
      if (this.filters.inStockMoscow !== undefined) {
        const hasStock = item.availability.moscow > 0;
        if (this.filters.inStockMoscow && !hasStock) return false;
      }
      if (this.filters.inStockOrenburg !== undefined) {
        const hasStock = item.availability.orenburg > 0;
        if (this.filters.inStockOrenburg && !hasStock) return false;
      }
      if (this.filters.inStockSaintPetersburg !== undefined) {
        const hasStock = item.availability.saintPetersburg > 0;
        if (this.filters.inStockSaintPetersburg && !hasStock) return false;
      }

      // === 5. Товар дня ===
      if (this.filters.goodsOfDay !== undefined && item.goodsOfDay !== this.filters.goodsOfDay) {
        return false;
      }

      // === 6. Рейтинг ===
      if (this.filters.minRating !== undefined && item.rating < this.filters.minRating) {
        return false;
      }

      return true;
    });
   return this.filteredData
  }

getFilteredData() {
    return this.filteredData;
  }

  getPage(page = 1, pageSize = 10) {
    const start = (page - 1) * pageSize;
    return this.filteredData.slice(start, start + pageSize);
  }

  getTotalPages(pageSize = 10) {
    return Math.ceil(this.filteredData.length / pageSize);
  }

  getActiveFilters() {
    return this.filters;
    }  

setStorage(data)
{
    this.storageData = data
    this.clearFilters()
}

getStorage()
{
    return this.storageData
}



}
const storage = new Storage()

export default storage