import React, { useState, useEffect }  from 'react'
import styled from 'styled-components'
import { loadStripe } from "@stripe/stripe-js";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CheckSvg from './../components/store/CheckSvg';


function StorePage() {

    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState(null);


  return (
    <Container>
    <div className="store-container">
      <h1 className="store-heading">ChatGPT Enhanced</h1>

      {/* 
      <div>
        <button className="monthly-button">MONTHLY</button>
      </div>
      */}

      <motion.div
        // animate in from the left of the screen
        initial={{ opacity: 1, x: -800 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="sub-card"
      >
        <div className="store-recommended">RECOMMENDED</div>

        <div className="sub-role">
          <h2 className="store-subheading">Premium</h2>
          <p className="text-gray">Advanced Features</p>
        </div>

        <div className="pricing">
          <div className="old-price">$14.99</div>
          <div className="price">
            $9.99<span className="currency-type">USD</span>
          </div>
          <div className="text-gray">Per Month</div>
        </div>

        <div className="sub-features">
          <div className="feature">
            <CheckSvg />
            Unlimited usage
          </div>
          <div className="feature">
            <CheckSvg />
            Access to all features
          </div>
          <div className="feature">
            <CheckSvg />
            Maximum message size
          </div>
          <div className="feature">
            <CheckSvg />
            Maximum response size
          </div>
        </div>

        {/* If a user is not subscribed, show the checkout button */}
        {subscription?.ended_at ||
        subscription?.role !== "premium" ||
        subscription?.status === "incomplete" ? (
          <>
            <button className="sub-button" onClick={() => loadCheckout()}>
              Choose Premium
              {loading && (
                <CircularProgress
                  style={{
                    width: 15,
                    height: 15,
                    marginLeft: 10,
                    color: "white",
                  }}
                />
              )}
            </button>
          </>
        ) : null}

        {/* If a user is subscribed, show the unsubscribe button */}
        {(!subscription?.ended_at && subscription?.status !== "incomplete") ||
        subscription?.status === "complete" ? (
          <a
            className="sub-button"
            href="https://billing.stripe.com/p/login/3cs2bKeB07PpgeI8ww"
          >
            Unsubscribe
          </a>
        ) : null}
      </motion.div>

      <Link className="home-button" to={"/"}>
        {/* Left arrow svg */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          style={{ marginRight: 10 }}
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
        Return Home
      </Link>
    </div>
    </Container>
  );
}

const Container = styled.div`
.store-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    background-color: #151419;
  }
  
  .sub-card {
    display: flex;
    flex-direction: column;
    background-color: #23242a;
    border-radius: 10px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.4),
      -2px -2px 8px 0px rgba(0, 0, 0, 0.4);
  }
  
  .store-recommended {
    background: linear-gradient(265.27deg, #0000 20.55%, #b3befe 94.17%);
    background-color: #7966f6;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 8px;
    text-align: center;
    font-weight: 600;
    color: white;
  }
  
  .monthly-button {
    margin-top: 0px;
    margin-bottom: 30px;
    letter-spacing: 0.04em;
    background-color: #0d0c0f;
    color: white;
    padding: 8px;
    padding-left: 40px;
    padding-right: 40px;
    border-radius: 8px;
    border-color: #0d0c0f;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .store-heading {
    text-align: center;
    letter-spacing: 0.01em;
    margin-top: 50px;
    color: white;
  }
  
  .sub-role {
    text-align: center;
  }
  
  .text-gray {
    color: #636468;
    text-align: center;
  }
  
  .pricing {
    text-align: center;
  }
  
  .price {
    font-weight: 800;
    font-size: 1.5em;
    margin-left: 20px;
  }
  
  .feature {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  
  .sub-button {
    padding: 10px;
    margin: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: linear-gradient(265.27deg, #0000 20.55%, #b3befe 94.17%);
    background-color: #7966f6;
    transition: all 0.2s ease-in;
    color: white;
    text-align: center;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    border-color: #7966f6;
    border-radius: 5px;
    font-weight: 600;
  }
  
  .sub-button:hover {
    background-color: #9f4cff;
    scale: 1.04;
  }
  
  .sub-button:active {
    opacity: 0.2;
  }
  
  .home-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-decoration: none;
    margin-top: 20px;
    margin-bottom: 10px;
    background: linear-gradient(265.27deg, #0000 20.55%, #0d0c0f 94.17%);
    background-color: #0d0c0f;
    border-radius: 10px;
    padding: 8px;
    transition: all 0.2s ease-in-out;
  }
  
  .home-button:hover {
    background-color: #b3befe;
    scale: 1.04;
  }
  
  .home-button:active {
    opacity: 0.2;
  }
  
  .currency-type {
    font-size: 0.4em;
    font-weight: 400;
    margin-left: 5px;
  }
  
  .old-price {
    text-decoration: line-through;
    color: #a5a7ab;
  }
  
  @media (min-width: 1024px) {
    .home-button {
      margin-top: 80px;
    }
  
    .old-price {
      font-size: 1.3em;
    }
  
    .sub-card {
      width: 400px;
    }
  
    .sub-features {
      margin-top: 30px;
    }
  
    .sub-button {
      margin: 20px;
      margin-top: 40px;
      margin-bottom: 30px;
      font-size: 1.1em;
    }
  
    .store-heading {
      font-size: 3em;
    }
  
    .monthly-button {
      font-size: 0.9em;
    }
  
    .sub-card {
      font-size: 1em;
      margin-top: 20px;
    }
  
    .store-recommended {
      font-size: 0.9em;
    }
  
    .store-subheading {
      font-size: 2em;
    }
  
    .monthly-button {
      margin-top: 80px;
      margin-bottom: 80px;
    }
  
    .price {
      font-size: 2.3em;
    }
  
    .feature {
      margin-left: 20px;
      margin-top: -5px;
    }
  }

`

export default StorePage