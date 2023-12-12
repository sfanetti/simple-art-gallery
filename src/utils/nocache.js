const nocache = object => imageKey => {
    const cacheable = object[imageKey];
    const uncached = !cacheable ? null :  `${cacheable}?t=${Date.now()}`;
    const uncachedObject = {};
    uncachedObject[imageKey] = uncached;
    return Object.assign(object, uncachedObject);
}

export default nocache;