class Storage {
  constructor() {
    this.storageData = [];
    this.filters = {};
    this.filteredData = [];
    this.sortType = null;
  }

  setFilter(filter) {
    const key = Object.keys(filter)[0];
    const value = filter[key];

    if (key === 'type') {
      // Накапливаем значения type в массив
      if (this.filters.type === undefined) {
        this.filters.type = [value];
      } else if (Array.isArray(this.filters.type)) {
        if (!this.filters.type.includes(value)) {
          this.filters.type = [...this.filters.type, value];
        }
      } else {
        // был строкой — преобразуем в массив
        if (this.filters.type !== value) {
          this.filters.type = [this.filters.type, value];
        }
      }
    } else {
      // Все остальные фильтры — просто перезаписываем
      this.filters = { ...this.filters, ...filter };
    }
    return this;
  }


    setSort(sortType) {

    this.sortType = sortType;
    this.applyFilters();
    return this;
  }

  removeFilter(key) {
    const { [key]: _, ...rest } = this.filters;
    this.filters = rest;
    this.applyFilters();
  }

  clearFilters() {
    this.filters = {};
    this.filteredData = [...this.storageData];
  }

  applyFilters() {
    this.filteredData = this.storageData.filter(item => {
      // === 1. Поиск по названию ===
      if (this.filters.search) {
        const term = this.filters.search.toLowerCase();
        if (!item.name.toLowerCase().includes(term)) return false;
      }

      if(this.filters.status == "instock")
      {

            if (item.availability.moscow==0 && item.availability.orenburg==0 && item.availability.saintPetersburg==0) return false;

      }

      // === 2. Фильтр по типу (item.type — массив) ===
      if (this.filters.type) {
        const filterTypes = Array.isArray(this.filters.type)
          ? this.filters.type
          : [this.filters.type];

        // Совпадение, если хотя бы один тип из item.type есть в filterTypes
        const hasMatchingType = item.type.some(t => filterTypes.includes(t));
        if (!hasMatchingType) return false;
      }

      // === 3. Цена ===
      if (this.filters.minPrice !== undefined && item.price.new < this.filters.minPrice) {
        return false;
      }
      if (this.filters.maxPrice !== undefined && item.price.new > this.filters.maxPrice) {
        return false;
      }

      // === 4. Наличие в городах ===
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


   if (this.sortType) {
      switch (this.sortType) {
        case 'price-min':
          this.filteredData.sort((a, b) => a.price.new - b.price.new);
          break;
        case 'price-max':
          this.filteredData.sort((a, b) => b.price.new - a.price.new);
          break;
        case 'rating-max':
          this.filteredData.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    return this.filteredData;
  }

  getFilteredData() {
    return this.filteredData;
  }

  getPage(page = 1, pageSize = 5) {
    const start = (page - 1) * pageSize;
    return this.filteredData.slice(start, start + pageSize);
  }

  getTotalPages(pageSize = 10) {
    return Math.ceil(this.filteredData.length / pageSize);
  }

  getActiveFilters() {
    return this.filters;
  }

  setStorage(data) {
    this.storageData = data;
    this.clearFilters();
  }

  getStorage() {
    return this.storageData;
  }
}

const storage = new Storage();
export default storage;