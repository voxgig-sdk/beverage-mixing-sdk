<?php
declare(strict_types=1);

// BeverageMixing SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

BeverageMixingUtility::setRegistrar(function (BeverageMixingUtility $u): void {
    $u->clean = [BeverageMixingClean::class, 'call'];
    $u->done = [BeverageMixingDone::class, 'call'];
    $u->make_error = [BeverageMixingMakeError::class, 'call'];
    $u->feature_add = [BeverageMixingFeatureAdd::class, 'call'];
    $u->feature_hook = [BeverageMixingFeatureHook::class, 'call'];
    $u->feature_init = [BeverageMixingFeatureInit::class, 'call'];
    $u->fetcher = [BeverageMixingFetcher::class, 'call'];
    $u->make_fetch_def = [BeverageMixingMakeFetchDef::class, 'call'];
    $u->make_context = [BeverageMixingMakeContext::class, 'call'];
    $u->make_options = [BeverageMixingMakeOptions::class, 'call'];
    $u->make_request = [BeverageMixingMakeRequest::class, 'call'];
    $u->make_response = [BeverageMixingMakeResponse::class, 'call'];
    $u->make_result = [BeverageMixingMakeResult::class, 'call'];
    $u->make_point = [BeverageMixingMakePoint::class, 'call'];
    $u->make_spec = [BeverageMixingMakeSpec::class, 'call'];
    $u->make_url = [BeverageMixingMakeUrl::class, 'call'];
    $u->param = [BeverageMixingParam::class, 'call'];
    $u->prepare_auth = [BeverageMixingPrepareAuth::class, 'call'];
    $u->prepare_body = [BeverageMixingPrepareBody::class, 'call'];
    $u->prepare_headers = [BeverageMixingPrepareHeaders::class, 'call'];
    $u->prepare_method = [BeverageMixingPrepareMethod::class, 'call'];
    $u->prepare_params = [BeverageMixingPrepareParams::class, 'call'];
    $u->prepare_path = [BeverageMixingPreparePath::class, 'call'];
    $u->prepare_query = [BeverageMixingPrepareQuery::class, 'call'];
    $u->result_basic = [BeverageMixingResultBasic::class, 'call'];
    $u->result_body = [BeverageMixingResultBody::class, 'call'];
    $u->result_headers = [BeverageMixingResultHeaders::class, 'call'];
    $u->transform_request = [BeverageMixingTransformRequest::class, 'call'];
    $u->transform_response = [BeverageMixingTransformResponse::class, 'call'];
});
