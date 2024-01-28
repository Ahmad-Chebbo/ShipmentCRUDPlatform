<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Client\Response;
use Illuminate\Http\RedirectResponse;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Pagination\LengthAwarePaginator;

class BaseController extends Controller
{
    /**
     * @var Request
     */
    protected Request $request;

    /**
     * ApiBaseController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @param bool $success
     * @param string $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJson(bool $success = true, mixed $message = null, mixed $data = null, int $status = 200): JsonResponse
    {
       return response()->json([
           'success'   => $success,
           'message'   => $message,
           'data'      => $data,
           'statusCode' => $status,
       ], $status);

    }

    /**
     * @param string $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJsonError(string $message = '', mixed $data = null, int $status = 500): JsonResponse
    {
        return $this->responseJson(false, $message, $data, $status);
    }

    /**
     * @param string $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJsonSuccess(string $message = '', mixed $data = null, int $status = 200): JsonResponse
    {
        return $this->responseJson(true, $message, $data, $status);
    }

    /**
     * @param array $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJsonErrorValidation(array $message = [], mixed $data = null, int $status = 422): JsonResponse
    {
        return $this->responseJson(false, $message, $data, $status);
    }

    /**
     * @param string $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJsonErrorNotFound(string $message = '', mixed $data = null, int $status = 404): JsonResponse
    {
        return $this->responseJson(false, $message, $data, $status);
    }

    /**
     * @param string $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJsonSuccessNotFound(string $message = '', mixed $data = null, int $status = 200): JsonResponse
    {
        return $this->responseJson(true, $message, $data, $status);
    }

    /**
     * @param string $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJsonErrorUnauthorized(string $message = '', mixed $data = null, int $status = 419): JsonResponse
    {
        return $this->responseJson(false, $message, $data, $status);
    }

    /**
     * @param string $message
     * @param array $data
     * @param int $status
     * @return JsonResponse
     */
    protected function responseJsonErrorInternalServerError(string $message = '', mixed $data = null, int $status = 500): JsonResponse
    {
        return $this->responseJson(false, $message, $data, $status);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    protected function respondWithToken(User $user, $message = 'Successfully logged in'): JsonResponse
    {
        return $this->responseJsonSuccess($message, [
            'access_token' => $user->generateToken(),
            'token_type' => 'bearer',
            'user' => $user,
        ]);
    }

    // Method to send request to external api
    public function sendRequest($url, $method, $data = null)
    {
        $client = new Client();
        try {
            $response = $client->request($method, $url, [
                'form_params' => $data,
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            return $e->getMessage();
        }
    }

}
