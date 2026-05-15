# BeverageMixing SDK utility: make_context

from core.context import BeverageMixingContext


def make_context_util(ctxmap, basectx):
    return BeverageMixingContext(ctxmap, basectx)
