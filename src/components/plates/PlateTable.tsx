import React from 'react';
import { PlateType } from '../../types/plates.types';
import { Link } from 'react-router-dom';

interface PlateTableProps {
  plate: PlateType | null | undefined;
  claimPlate: () => void;
  registerPlate: () => void;
  plateNumber: string;
  plateState: string;
  successMessage?: string;
}

const PlateTable: React.FC<PlateTableProps> = ({ 
  plate, 
  claimPlate, 
  registerPlate, 
  plateNumber,
  plateState,
  successMessage,
}) => {

  let plateAction;
  if (plate) {
    if (plate?.isOwned) {
      plateAction = (
        <>
          <td>ALREADY CLAIMED</td>
          <tr>
            <td>
              <p>Need to <strong>Unlink</strong> your plate? Go to:</p>
              <Link to="/my-plates">
                <span className="my-plates-link">My Plates</span>
              </Link>
            </td>
          </tr>
        </>
      );
    } else {
      console.log('there is no plate')
      plateAction = (
        <td>
          <button
            className="register-plate"
            onClick={claimPlate}
            disabled={!!successMessage}
          >
            Claim Plate
          </button>
        </td>
      );
    }
  } else if (plate === undefined) {
    plateAction = (
      <td>
        <button
          className="register-plate"
          onClick={registerPlate}
          disabled={!!successMessage}
        >
          Register Plate
        </button>
      </td>
    );
  }

  return (
    <section className="plate-table">
      <table>
        <tbody>
          <tr>
            <th>
              <span className="mobile-hide">License</span> Plate
            </th>
            <th>State</th>
            <th>Add<span className="mobile-hide"> to Your Account</span></th>
            {plateAction && <th>Register <span className="mobile-hide">Your Plate</span></th>}
          </tr>
            <tr>
              <td>{plate?.plateNumber || plateNumber}</td>
              <td>{plate?.plateState || plateState}</td>
              {plateAction}
            </tr>
        </tbody>
      </table>
    </section>
  );
};

export default PlateTable;
