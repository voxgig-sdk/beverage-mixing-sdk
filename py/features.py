# BeverageMixing SDK feature factory

from feature.base_feature import BeverageMixingBaseFeature
from feature.test_feature import BeverageMixingTestFeature


def _make_feature(name):
    features = {
        "base": lambda: BeverageMixingBaseFeature(),
        "test": lambda: BeverageMixingTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
