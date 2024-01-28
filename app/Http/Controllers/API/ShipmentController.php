<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\SaveShipmentRequest;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Models\Shipment;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class ShipmentController extends BaseController
{
    /**
     * Get all shipments records
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            
            $shipments = Shipment::where('user_id', Auth::id())
                // ->with('user:id,name')
                ->paginate(10);

            return $this->responseJsonSuccess('Shipments retrieved successfully', $shipments);

        } catch (\Exception $ex) {
            return $this->responseJsonError('Oops! Something went wrong', $ex->getMessage());
        }
    }

    /**
    * @param SaveShipmentRequest $request
    * Store new shipment
    * @return JsonResponse
    */
    public function store(SaveShipmentRequest $request): JsonResponse
    {
        try {
            $authUser = Auth::user();

            $shipment = $authUser->shipments()->create($request->validated());

            return $this->responseJsonSuccess( 'Shipment created successfully', $shipment);

        } catch (\Exception $ex) {
            return $this->responseJsonError('Oops! Something went wrong', $ex->getMessage());
        }
    }


    /**
     * @param Shipment $shipment
     * Return specific record details
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(Shipment $shipment): JsonResponse
    {
        try {

            if (request()->user()->cannot('show', $shipment)) {
                return $this->responseJsonError('This action is unauthorized', null, 401);
            }

            return $this->responseJsonSuccess( 'Shipment returned successfully', $shipment->load(('user:id,name')));
        } catch (\Exception $ex) {
            return $this->responseJsonError('Oops! Something went wrong', $ex->getMessage());
        }
    }

    /**
    * @param SaveShipmentRequest $request
    * Store new shipment
    * @return JsonResponse
    */
    public function update(SaveShipmentRequest $request, Shipment $shipment): JsonResponse
    {
        try {
            if ($request->user()->cannot('update', $shipment)) {
                return $this->responseJsonError('This action is unauthorized', null, 401);
            }
    
            $shipment->update($request->validated());
    
            return $this->responseJsonSuccess('Shipment updated successfully', $shipment);
    
        } catch (\Exception $ex) {
            return $this->responseJsonError('Oops! Something went wrong', $ex->getMessage());
        }
    }

    /**
    * @param SaveShipmentRequest $request
    * Store new shipment
    * @return JsonResponse
    */
    public function destroy(Shipment $shipment): JsonResponse
    {
        try {
            if (request()->user()->cannot('destroy', $shipment)) {
                return $this->responseJsonError('This action is unauthorized', null, 401);
            }
    
            $shipment->delete();

            return $this->responseJsonSuccess( 'Shipment removed successfully');

        } catch (\Exception $ex) {
            return $this->responseJsonError('Oops! Something went wrong', $ex->getMessage());
        }
    }
}
