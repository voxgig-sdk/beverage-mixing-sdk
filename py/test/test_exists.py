# ProjectName SDK exists test

import pytest
from beveragemixing_sdk import BeverageMixingSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BeverageMixingSDK.test(None, None)
        assert testsdk is not None
