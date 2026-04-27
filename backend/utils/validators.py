def validate_temperature(value):
    if value is None:
        return "Temperatura é obrigatória"
    if not (20 <= value <= 90):
        return "Temperatura deve estar entre 20 e 90"
    return None


def validate_pressure(value):
    if value is None:
        return "Pressão é obrigatória"
    if not (20 <= value <= 62):
        return "Pressão deve estar entre 20 e 62"
    return None