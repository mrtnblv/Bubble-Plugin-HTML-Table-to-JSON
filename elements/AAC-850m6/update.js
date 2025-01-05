function(instance, properties, context) {
    
    instance.data.props = properties;
    if (typeof instance.data.run === 'function') instance.data.run(properties);

}