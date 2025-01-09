import { getDefaultMeasurementUnit } from "./measurementUnit.js";

class CurrentQuery {
    constructor() {
        this._cityName = "";
        this._lat = null;
        this._lon = null;
        this._measurementUnit = getDefaultMeasurementUnit();
    }

    getCityName() {
        return this._cityName;
    }

    setCityName(name) {
        this._cityName = name;
    }

    getLat() {
        return this._lat;
    }

    setLat(lat) {
        this._lat = lat;
    }

    getLon() {
        return this._lon;
    }

    setLon(lon) {
        this._lon = lon;
    }

    getMeasurementUnit() {
        return this._measurementUnit;
    }

    setMeasurementUnit(unit) {
        this._measurementUnit = unit;
    }
}

export const currentQuery = new CurrentQuery();
