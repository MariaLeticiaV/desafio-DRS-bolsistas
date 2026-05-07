def validate_temperature(value):
    try:
        value = float(value)
    except:
        return "Temperatura inválida"

    if not (20 <= value <= 70):
        return "Temperatura deve estar entre 20 e 70"

    return None


def validate_pressure(value):
    try:
        value = float(value)
    except:
        return "Pressão inválida"

    if not (20 <= value <= 62):
        return "Pressão deve estar entre 20 e 62"

    return None