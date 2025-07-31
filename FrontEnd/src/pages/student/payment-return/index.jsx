import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaypalPaymentReturnPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  
  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/student-courses";
        }
      }
      capturePayment();
    }
  }, [payerId, paymentId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="flex flex-col items-center py-12">
      
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full absolute border-8 border-blue-200"></div>
            <div className="w-24 h-24 rounded-full animate-spin border-8 border-transparent border-t-blue-500 border-r-indigo-500"></div>
          </div>
          
         
          <CardTitle className="text-2xl font-bold text-gray-800">
            <span className="animate-pulse">
              Processing payment
              <span className="inline-block animate-bounce">
                <span className="mx-0.5">.</span>
                <span className="mx-0.5 animation-delay-100">.</span>
                <span className="mx-0.5 animation-delay-200">.</span>
              </span>
            </span>
            <div className="mt-3 text-lg font-normal text-gray-600">
              Please wait
            </div>
          </CardTitle>
          
        
          <div className="mt-8 flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 bg-blue-400 rounded-full opacity-70"
                style={{
                  animation: `float 2s infinite ease-in-out`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </CardHeader>
      </Card>
      
     
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default PaypalPaymentReturnPage;