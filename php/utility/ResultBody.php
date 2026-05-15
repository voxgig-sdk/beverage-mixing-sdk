<?php
declare(strict_types=1);

// BeverageMixing SDK utility: result_body

class BeverageMixingResultBody
{
    public static function call(BeverageMixingContext $ctx): ?BeverageMixingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
