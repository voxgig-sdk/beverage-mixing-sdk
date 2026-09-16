# BeverageMixing SDK feature factory

from beveragemixing_sdk.feature.base_feature import BeverageMixingBaseFeature
from beveragemixing_sdk.feature.ratelimit_feature import BeverageMixingRatelimitFeature
from beveragemixing_sdk.feature.retry_feature import BeverageMixingRetryFeature
from beveragemixing_sdk.feature.test_feature import BeverageMixingTestFeature
from beveragemixing_sdk.feature.timeout_feature import BeverageMixingTimeoutFeature


_FEATURES = {
    "base": lambda: BeverageMixingBaseFeature(),
    "ratelimit": lambda: BeverageMixingRatelimitFeature(),
    "retry": lambda: BeverageMixingRetryFeature(),
    "test": lambda: BeverageMixingTestFeature(),
    "timeout": lambda: BeverageMixingTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
