<?php
declare(strict_types=1);

// BeverageMixing SDK utility: result_headers

class BeverageMixingResultHeaders
{
    public static function call(BeverageMixingContext $ctx): ?BeverageMixingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
